
from django.urls import path
from api.views import PrivateApi, PublicApi

urlpatterns = [
    path('testapi/', PrivateApi.as_view(), name='privateapi'),
    path('publicapi/', PublicApi.as_view(), name='publicapi'),


]
