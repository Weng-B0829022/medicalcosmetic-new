
from django.urls import path
from accounts.views import UserRegistrationView, UserLoginView, TokenRefreshView

urlpatterns = [
    path('register', UserRegistrationView.as_view(), name='user-register'),
    path('login', UserLoginView.as_view(), name='user-login'),
    path('token/refresh', TokenRefreshView.as_view(), name='token-refresh'),
]
