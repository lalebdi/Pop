from django.contrib.auth import get_user_model
from rest_framework import authentication


User = get_user_model()

# This random user is associated with our request
# Needs to be adjusted during production by removing defualt authentication from the debug list in the settings.py

class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.all()
        user = qs.order_by("?").first()
        return (user, None)
