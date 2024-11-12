from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.db import transaction
from django.contrib.auth import authenticate, login
from .serializers import UserLoginSerializer, UserRegistrationSerializer, TokenResponseSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from datetime import datetime, timezone

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        # 強制設置為一般用戶 此為一班用戶註冊的地方 因此強制為user
        safe_data = request.data.copy()
        safe_data['user_type'] = 'user'
        
        # 移除危險字段
        safe_data.pop('is_superuser', None)
        safe_data.pop('is_active', None)
        
        serializer = self.serializer_class(data=safe_data)
        
        try:
            with transaction.atomic():
                #驗證密碼是否有太過簡單等等問題
                if serializer.is_valid():
                    user = serializer.save()
                    
                    response_data = {
                        'message': _('註冊成功'),
                        'user': {
                            'email': user.email,
                            'first_name': user.first_name,
                            'last_name': user.last_name
                        }
                    }
                    
                    return Response(
                        response_data,
                        status=status.HTTP_201_CREATED
                    )
                
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        except Exception as e:
            return Response(
                {'error': _('註冊過程中發生未知錯誤')},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class UserLoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        
        try:
            if serializer.is_valid():
                # 使用自定義的認證方法
                user = serializer.authenticate(request)
                
                # 生成JWT token
                refresh_token = CustomTokenObtainPairSerializer.get_token(user)
                access_token = {
                    'access': str(refresh_token.access_token)
                }
                
                # 使用TokenResponseSerializer格式化回應
                response_serializer = TokenResponseSerializer(
                    access_token,
                    context={'user': user}
                )
                
                response = Response(
                    response_serializer.data,
                    status=status.HTTP_200_OK
                )
                # 將 refresh token 設置在 HTTP-only cookie 中
                refresh_token = str(refresh_token)
                response.set_cookie(
                    key='refresh_token',
                    value=refresh_token,
                    httponly=True,  # 防止 JavaScript 訪問
                    secure=False,    # 只在 HTTPS 下傳輸
                    samesite='Lax', # 防止 CSRF 攻擊
                    path='token/refresh',  # 只在更新 token 的路徑可用
                    expires=datetime.now(timezone.utc) + settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']
                )
                
                return response

            
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except serializers.ValidationError as e:
            return Response(
                e.detail,
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenRefreshView(TokenRefreshView):
    """
    自定義token刷新視圖，可以在這裡添加額外的邏輯
    """
    pass