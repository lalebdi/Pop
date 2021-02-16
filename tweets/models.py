from django.db import models
from django.conf import settings
import random

# Create your models here.

User = settings.AUTH_USER_MODEL

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) # this is so many users can have many tweets. CASCADE will remove all the user's tweets. If I want to keep a history change the params to null=Truem and on_delete=models.SET_NULL
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)

    class Meta:
        ordering = ['-id'] # reverses the order

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0, 2021)
        }