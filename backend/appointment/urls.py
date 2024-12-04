# api/urls.py

"""
預約系統 API 路由說明

一、預約功能：
/appointments/           - GET: 查看所有預約列表
                        - POST: 建立新預約

/appointments/<id>/     - GET: 查看特定預約詳情
                        - PUT: 修改預約資訊
                        - DELETE: 取消預約

二、預約查詢功能：
/appointments/search/   - GET: 依條件查詢預約（支援日期、狀態等篩選）
/appointments/today/    - GET: 查詢今日預約
/appointments/upcoming/ - GET: 查詢即將到來的預約

三、個人預約記錄：
/user/appointments/    - GET: 查看個人所有預約記錄
"""

from django.urls import path
from api.views import (
    AppointmentListApi,
    AppointmentDetailApi,
    AppointmentSearchApi,
    UserAppointmentApi
)

urlpatterns = [
    # 基本預約功能
    path('appointments/', AppointmentListApi.as_view(), name='appointment-list'),
    path('appointments/<int:pk>/', AppointmentDetailApi.as_view(), name='appointment-detail'),
    
    # 預約查詢功能
    path('appointments/search/', AppointmentSearchApi.as_view(), name='appointment-search'),
    path('appointments/today/', AppointmentSearchApi.as_view(), name='appointment-today'),
    path('appointments/upcoming/', AppointmentSearchApi.as_view(), name='appointment-upcoming'),
    
    # 個人預約記錄
    path('user/appointments/', UserAppointmentApi.as_view(), name='user-appointments'),
]