from datetime import date
import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse, response
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from rest_framework import serializers
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action, api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from tweets.serializers import TweetSerializer
from pop.settings import ALLOWED_HOSTS
from ..forms import TweetForm
from ..models import Tweet
from ..serializers import TweetSerializer, TweetActionSerializer, TweetCreateSerializer

# Create your views here.

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view(['POST']) # That means the method the client sends == POST
# @authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated]) # if authenticated, they have access to this
def tweet_create_view(request, *args, **kwargs): # <- REST Framework handling this
    # print(request.POST)
    # print(request.data)
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated]) # if authenticated, they have access to this
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists(): # permission will not be denied
        return Response({"message": "You cannot delete this tweet"}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Tweet removed"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated]) # if authenticated, they have access to this
def tweet_action_view(request, *args, **kwargs):
    ''' The actions are: like, unlike, and retweet. ID is required'''
    # print(request.POST, request.data)
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
        qs = Tweet.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "retweet":
            parent_obj = obj
            new_tweet = Tweet.objects.create(user=request.user, parent=parent_obj, content=content)
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)
    return Response({"message": "Action Happened"}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated]) # if authenticated, they have access to this
def tweet_feed_view(request, *args, **kwargs):
    user = request.user
    profiles = user.following.all()
    followed_users_id = []
    if profiles.exists():
        followed_users_id = [x.user.id for x in profiles]
    followed_users_id.append(user.id)
    qs = Tweet.objects.filter(user__id__in=followed_users_id).order_by("-timestamp") # the "-" will give us the newest first. removing it will result in oldest first
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    username = request.GET.get('username') # the url is going to pass a parameter (username) ?username=Leah
    if username != None:
        qs = qs.filter(user__username__iexact=username) # will still lookup the user even if with a different case(lower or upper)
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)


def tweet_create_view_pure_django(request, *args, **kwargs):
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    # print("AJAX",request.is_ajax()) # its false because I didn't add the header
    form = TweetForm(request.POST or None)
    # print("post data is =", request.POST)
    next_url = request.POST.get("next") or None
    # print("next url = ", next_url)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201) # 201 is for created items

        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
    return render(request, 'components/form.html', context={"form": form})


def tweet_list_view_pure_django(request, *args, **kwargs):
    """
    REST API VIEW
    Consumed by JavaScript or Swift
    return json data
    """
    qs = Tweet.objects.all()
    tweets_list = [x.serialize() for x in qs] # replaced the dict with the method from the model
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)


def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    Consumed by JavaScript or Swift
    return json data
    """
    data = {
        "id": tweet_id,
        # "content": obj.content,
        # "image_path": obj.image.url
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404

    return JsonResponse(data, status=status)  # json.dumps with a content type ='application/json'