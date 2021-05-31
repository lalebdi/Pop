from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Profile

# Create your tests here.


User = get_user_model()

class ProfileTestCase(TestCase):
    def setUp(self): # this method allows me to create all of the instances I need to create. Here I need to create a user to run the test.
        self.user = User.objects.create_user(username='efg', password='somepassword')
        self.userB = User.objects.create_user(username='abc', password='somepassword2')

    
    def test_profile_created(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)
    

    def test_following(self):
        first = self.user
        second = self.userB
        first.profile.followers.add(second) # adding a follower here
        second_user_following_who = second.following.all()
        qs = second_user_following_who.filter(user=first) # from a user, check if the new follower exists
        self.assertTrue(qs.exists())
        first_user_following_none = first.following.all()
        self.assertFalse(first_user_following_none.exists())