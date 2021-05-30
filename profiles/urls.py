
from django.urls import path, include
from .views import profile_detail_view


urlpatterns = [
    path('<str:username>', profile_detail_view),
    # path('', tweets_list_view),
]