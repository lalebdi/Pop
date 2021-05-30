
from django.db import models
from django.db.models.deletion import CASCADE
from django.conf import settings

# Create your models here.

User = settings.AUTH_USER_MODEL
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) # One to One is for one user to have one profile
    location = models.CharField(max_length=220, null=True, blank=True)
    bio = models.CharField(max_length=220, null=True, blank=True)