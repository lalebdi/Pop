from pop.settings import ALLOWED_HOSTS
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
import random
from django.utils.http import is_safe_url
from django.conf import settings
from .forms import TweetForm
from .models import Tweet

# Create your views here.

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def home_view(request, *args, **kwargs):
    return render(request, "pages/home.html", context={}, status=200)


def tweet_create_view(request, *args, **kwargs):
    # print("AJAX",request.is_ajax()) # its false because I didn't add the header
    form = TweetForm(request.POST or None)
    # print("post data is =", request.POST)
    next_url = request.POST.get("next") or None
    # print("next url = ", next_url)
    if form.is_valid():
        obj = form.save(commit=False)
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


def tweet_list_view(request, *args, **kwargs):
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


def tweet_detail_view(request, tweet_id, *args, **kwargs):
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