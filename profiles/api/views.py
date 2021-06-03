
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.decorators import action, api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
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
    try: # can use (data = request.data or {}) instead
        data = request.data
    except:
        pass
    # print(data)
    action = data.get("action")
    if action == "follow":
        profile.followers.add(me)
    elif action == "unfollow":
        profile.followers.remove(me)
    else:
        pass
    current_followers_qs = profile.followers.all()
    return Response({"count": current_followers_qs.count()}, status=200)







