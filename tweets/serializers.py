from rest_framework.decorators import action
from pop.settings import MAX_TWEET_LENGTH
from django.db.models import fields
from django.conf import settings
from rest_framework import serializers
from profiles.serializers import PublicProfileSerializer
from .models import Tweet

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS


class TweetActionSerializer(serializers.Serializer): # Both fields are required
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip() # just to make sure!
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action")
        return value


class TweetCreateSerializer(serializers.ModelSerializer): # <- this is for the create view
    user = PublicProfileSerializer(source="user.profile", read_only=True) #serializers.SerializerMethodField(read_only=True) 
    likes = serializers.SerializerMethodField(read_only=True) # I just want it to be numbers
    
    class Meta:
        model = Tweet
        fields = ['user', 'id','content', 'likes', 'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long! Max limit 240 charaters.")
        return value


    # def get_user(self, obj):
    #     return obj.user.id


class TweetSerializer(serializers.ModelSerializer): # This is read only for the retweeting action
    user = PublicProfileSerializer(source="user.profile", read_only=True) #user = serializers.SerializerMethodField(read_only=True) 
    likes = serializers.SerializerMethodField(read_only=True) # I just want it to be numbers
    # content = serializers.SerializerMethodField(read_only=True)
    # No need to call a serializer method again for a property in the serializers.py since it is in the object itself
    parent = TweetCreateSerializer(read_only=True)
    
    class Meta:
        model = Tweet
        fields = ['user', 'id','content', 'likes', 'is_retweet', 'parent', 'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()

    
    # def get_user(self, obj):
    #     return obj.user.id

    # def get_content(self, obj):
    #     content = obj.content
    #     if obj.is_retweet:
    #         content = obj.parent.content
    #     return content