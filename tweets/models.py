from django.db import models
from django.conf import settings
import random

# Create your models here.

User = settings.AUTH_USER_MODEL


class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Tweet(models.Model):
    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL) # the self is to refrence the model itself
    user = models.ForeignKey(User, on_delete=models.CASCADE) # this is so many users can have many tweets. CASCADE will remove all the user's tweets. If I want to keep a history change the params to null=Truem and on_delete=models.SET_NULL
    likes = models.ManyToManyField(User, related_name='tweet_user', blank=True, through=TweetLike) # Many to Many meanns one tweet can have many users
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    # def __str__(self): # this will show the contents in the admin page instead of the id
    #     return self.content

    class Meta:
        ordering = ['-id'] # reverses the order

    @property
    def is_retweet(self):
        ''' if the parent is not a None then it is a retweet '''
        return self.parent != None
    
    def serialize(self):
        ''' Not needed anymore because of the new class at the serilaizers '''
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0, 2021)
        }