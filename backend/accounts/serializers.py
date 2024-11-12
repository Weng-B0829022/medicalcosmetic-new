from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

import re
User = get_user_model()
class PasswordValidation:
    @staticmethod
    def validate_password_format(password):
        """驗證密碼格式的通用方法"""
        if len(password) < 8:
            raise serializers.ValidationError('密碼長度必須至少為8個字符')
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError('密碼必須包含至少一個大寫字母')
        if not re.search(r'[a-z]', password):
            raise serializers.ValidationError('密碼必須包含至少一個小寫字母')
        if not re.search(r'[0-9]', password):
            raise serializers.ValidationError('密碼必須包含至少一個數字')
        # if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        #     raise serializers.ValidationError('密碼必須包含至少一個特殊字符')
        return password

class UserRegistrationSerializer(serializers.ModelSerializer, PasswordValidation):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        help_text='密碼必須包含至少8個字符',
        error_messages={
            'required': '密碼為必填項'
        }
    )
    confirm_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        help_text='請再次輸入密碼',
        error_messages={
            'required': '確認密碼為必填項'
        }
    )
    email = serializers.EmailField(
        error_messages={
            'required': 'Email為必填項',
            'invalid': '請輸入有效的email格式',
        }
    )

    class Meta:
        model = User
        fields = [
            'id', 'email', 'password', 'confirm_password',
            'first_name', 'last_name', 'user_type',
            'is_active', 'date_joined', 'last_login',
        ]
        read_only_fields = [
            'id',             # 主鍵永遠是唯讀
            'date_joined',    # 加入日期由系統自動設置
            'last_login',     # 最後登入時間由系統自動更新
            'is_active',      # 帳戶狀態應該通過特定的API來修改
            'user_type',      # 用戶類型應該通過特定的API來修改
        ]
    #可自訂驗證格式 如果沒有驗證 則會使用預設的驗證
    def validate_email(self, value):
        email = value.lower()
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(_('此email已經被註冊'))
        return email

    def validate_password(self, value):
        return self.validate_password_format(value)

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({
                'confirm_password': '兩次密碼輸入不一致'
            })
        return attrs

    def create(self, validated_data):
        try:
            validated_data.pop('confirm_password', None)
            user = User.objects.create_user(
                email=validated_data.pop('email'),
                password=validated_data.pop('password'),
                **validated_data
            )
            return user
        except Exception as e:
            raise serializers.ValidationError(str(e))

class UserLoginSerializer(serializers.Serializer, PasswordValidation):
    email = serializers.EmailField(
        required=True,
        error_messages={
            'required': 'Email為必填項',
            'invalid': '請輸入有效的email格式'
        }
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        error_messages={
            'required': '密碼為必填項'
        }
    )

    def validate_email(self, value):
        return value.lower()

    def authenticate(self, request=None):
        email = self.validated_data.get('email')
        password = self.validated_data.get('password')
        
        try:
            user = User.objects.get(email=email)
            print(user.is_active)
            # 檢查帳號是否啟用
            if not user.is_active:
                raise serializers.ValidationError({
                    'error': _('此帳號已被停用')
                })
            # 檢查密碼格式
            try:
                self.validate_password_format(password)
            except serializers.ValidationError as e:
                raise serializers.ValidationError({
                    'error': str(e.detail[0] if isinstance(e.detail, list) else e.detail)
                })
            # 檢查密碼是否正確
            if not user.check_password(password):
                raise serializers.ValidationError({
                    'error': _('Email或密碼錯誤')
                })
                
            
                
            return user
        except serializers.ValidationError:
            # 重新拋出 ValidationError，這樣可以保持原始的錯誤訊息
            raise 
        except Exception as e:
            print(f"Unexpected error: {str(e)}")  # 加入這行來調試
            raise serializers.ValidationError({
                'error': _('Email或密碼錯誤')
            })


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # 在 token payload 中添加需要的用戶信息
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['user_type'] = user.user_type
        # 可以添加其他需要的信息
        
        return token

class TokenResponseSerializer(serializers.Serializer):
    """簡化後的序列化器，只返回 access token"""
    access = serializers.CharField()
    
class UserUpdateSerializer(serializers.ModelSerializer):
    """用於更新用戶資料的序列化器（不含密碼）"""
    
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'user_type',
            'is_active'
        ]
        read_only_fields = ['id']

class ChangePasswordSerializer(serializers.Serializer):
    """用於修改密碼的序列化器"""
    
    old_password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    confirm_new_password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_new_password']:
            raise serializers.ValidationError({
                'new_password': _('新密碼兩次輸入不一致')
            })
        return attrs