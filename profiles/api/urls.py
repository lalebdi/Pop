from django.contrib import admin
from django.urls import path

from .views import user_follow_view, profile_detail_api_view

urlpatterns = [
    path('<str:username>/follow', user_follow_view),
    path('<str:username>/', profile_detail_api_view), # TODO:need to fix the bug here. it is case sensitive. 
]
