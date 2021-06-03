from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Profile

from rest_framework.test import APIClient

# Create your tests here.


User = get_user_model()

class ProfileTestCase(TestCase):
    def setUp(self): # this method allows me to create all of the instances I need to create. Here I need to create a user to run the test.
        self.user = User.objects.create_user(username='efg', password='somepassword')
        self.userB = User.objects.create_user(username='abc', password='somepassword2')


    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client
    

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

    
    def test_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(f"/api/profiles/{self.userB.username}/follow",
                {"action": "follow"}
            )
        r_data = response.json()
        count = r_data.get("count")
        self.assertEqual(count, 1) 

    
    def test_unfollow_api_endpoint(self):
        first = self.user
        second = self.userB
        first.profile.followers.add(second)
        client = self.get_client()
        response = client.post(f"/api/profiles/{self.userB.username}/follow",
                {"action": "unfollow"}
            )
        r_data = response.json()
        count = r_data.get("count")
        self.assertEqual(count, 0) 


    def test_cannot_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(f"/api/profiles/{self.user.username}/follow",
                {"action": "follow"}
            )
        r_data = response.json()
        count = r_data.get("count")
        self.assertEqual(count, 0) 