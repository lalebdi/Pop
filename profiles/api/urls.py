from django.contrib import admin
from django.urls import path

from .views import profile_detail_api_view #user_follow_view

urlpatterns = [
    path('<str:username>/follow', profile_detail_api_view),
    path('<str:username>/', profile_detail_api_view), # TODO:need to fix the bug here. it is case sensitive. 
]
