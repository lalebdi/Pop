from django.http import Http404
from django.shortcuts import render
from django.db.models.signals import post_save
from .models import Profile, User
# Create your views here.


def profile_detail_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username = username) # user__username for the foreign key relationship
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    context = {
        "username": username,
        "profile": profile_obj
        }
    return render(request, "profiles/detail.html", context)


def user_did_save(sender, instance, created,*args, **kwargs):
    # Profile.objects.get_or_create(user= instance)
    if created:
        Profile.objects.get_or_create(user= instance)


post_save.connect(user_did_save, sender= User)