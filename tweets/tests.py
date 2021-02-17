from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Tweet
from rest_framework.test import APIClient

# Create your tests here.
# to run a test your method should start with "test_"

User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self): # this method allows me to create all of the instances I need to create. Here I need to create a user to run the test.
        # User.objects.create_user(username='abc', password='somepassword')
        self.user = User.objects.create_user(username='efg', password='somepassword')

    def test_user_created(self):
        # user = User.objects.get(username='efg')
        self.assertEqual(self.user.username, "efg") # assert Equal comes inhereted from TestCase
        # self.assertEqual(1, 2)

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(content="test tweet", user=self.user)
        self.assertEqual(tweet_obj.id, 1)
        self.assertEqual(tweet_obj.user, self.user)

    def test_api_login(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')