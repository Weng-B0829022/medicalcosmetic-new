from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('Email必須提供'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        # 移除 is_staff 相關的設定
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('user_type', 'super_user')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser 必須設定 is_superuser=True'))

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    class UserType(models.TextChoices):
        SUPER_USER = 'super_user', _('超級管理員')
        USER = 'user', _('一般用戶')
        PROVIDER = 'provider', _('服務提供者')

    username = None
    email = models.EmailField(_('電子郵件'), unique=True)
    
    user_type = models.CharField(
        _('用戶類型'),
        max_length=20,
        choices=UserType.choices,
        default=UserType.USER
    )

    # 這行用來移除 is_staff 欄位
    is_staff = None

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('用戶')
        verbose_name_plural = _('用戶')

    def __str__(self):
        return self.email
    
    def is_provider(self):
        return self.user_type == self.UserType.PROVIDER

    def is_super_user(self):
        return self.user_type == self.UserType.SUPER_USER