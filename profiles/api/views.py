
from django.conf import settings
from django.contrib.auth import get_user_model
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
from ..models import Profile

# Create your views here.

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view(['GET','POST']) # That means the method the client sends == POST
# @authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated]) # if authenticated, they have access to this
def user_follow_view(request, username, *args, **kwargs): # <- REST Framework handling this
    me = request.user
    other_user_qs = User.objects.filter(username=username)
    if not other_user_qs.exists():
        return Response({}, status=404)
    other = other_user_qs.first()
    profile = other.profile
    data = {}
    try:
        data = request.data
    except:
        pass
    print(data)
    action = data.get("action")
    if action == "follow":
        profile.follwers.add(me)
    elif action == "unfollow":
        profile.followes.remove(me)
    else:
        pass
    current_followers_qs = profile.followers.all()
    return Response({"count": current_followers_qs.count()}, status=400)






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