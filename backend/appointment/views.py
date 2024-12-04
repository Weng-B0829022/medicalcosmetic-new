from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Appointment
from .serializers import AppointmentSerializer
from django.db.models import Q

class AppointmentListApi(generics.ListCreateAPIView):
    """預約列表 API，支援查看所有預約和建立新預約"""
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Appointment.objects.all()
        return Appointment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AppointmentDetailApi(generics.RetrieveUpdateDestroyAPIView):
    """預約詳情 API，支援查看、修改和取消特定預約"""
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Appointment.objects.all()
        return Appointment.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        # 檢查是否可以修改
        appointment = self.get_object()
        if appointment.date < timezone.now().date():
            raise serializers.ValidationError("無法修改過去的預約")
        serializer.save()

    def perform_destroy(self, instance):
        # 檢查是否可以取消
        if instance.date < timezone.now().date():
            raise serializers.ValidationError("無法取消過去的預約")
        instance.status = 'cancelled'
        instance.save()

class AppointmentSearchApi(APIView):
    """預約查詢 API，支援多種查詢條件"""
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # 獲取查詢參數
        date = request.query_params.get('date')
        status = request.query_params.get('status')
        
        # 基本查詢集
        queryset = Appointment.objects.filter(user=request.user)

        # 路徑判斷
        if 'today' in request.path:
            queryset = queryset.filter(date=timezone.now().date())
        elif 'upcoming' in request.path:
            queryset = queryset.filter(
                date__gte=timezone.now().date()
            ).order_by('date', 'time')
        else:
            # 一般搜尋
            if date:
                try:
                    search_date = datetime.strptime(date, '%Y-%m-%d').date()
                    queryset = queryset.filter(date=search_date)
                except ValueError:
                    return Response(
                        {"error": "日期格式錯誤，請使用 YYYY-MM-DD 格式"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            if status:
                queryset = queryset.filter(status=status)

        # 序列化並返回結果
        serializer = AppointmentSerializer(queryset, many=True)
        return Response(serializer.data)

class UserAppointmentApi(generics.ListAPIView):
    """個人預約記錄 API"""
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(
            user=self.request.user
        ).order_by('-date', '-time')


    STATUS_CHOICES = (
        ('pending', '待確認'),
        ('confirmed', '已確認'),
        ('completed', '已完成'),
        ('cancelled', '已取消'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='預約用戶'
    )
    date = models.DateField(verbose_name='預約日期')
    time = models.TimeField(verbose_name='預約時間')
    patient_name = models.CharField(
        max_length=100,
        verbose_name='病患姓名'
    )
    phone = models.CharField(
        max_length=20,
        verbose_name='聯絡電話'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='預約狀態'
    )
    notes = models.TextField(
        blank=True,
        null=True,
        verbose_name='備註'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='建立時間'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='更新時間'
    )

    class Meta:
        ordering = ['-date', '-time']
        verbose_name = '預約'
        verbose_name_plural = '預約列表'

    def __str__(self):
        return f"{self.patient_name} - {self.date} {self.time}"