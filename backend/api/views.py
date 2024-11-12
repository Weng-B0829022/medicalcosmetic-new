from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


# 建立基礎類別給需要認證的 API
class AuthenticatedAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_user_info(self):
        """獲取用戶信息的輔助方法"""
        print(f'用戶是否已登入: {self.request.user.is_authenticated}')
        print(f'當前用戶: {self.request.user}')

# 需要認證的 API 都繼承 AuthenticatedAPIView
class PrivateApi(AuthenticatedAPIView):
    def get(self, request):
        self.get_user_info()  # 打印用戶信息
        return JsonResponse({'message': "(This is a private API)"})

# 不需要認證的 API 直接繼承 APIView
class PublicApi(APIView):
    def get(self, request):
        return JsonResponse({'message': 'This is a public API'})
