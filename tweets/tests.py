from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Tweet
from rest_framework.test import APIClient

# Create your tests here.
# to run a test your method should start with "test_"

User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self): # this method allows me to create all of the instances I need to create. Here I need to create a user to run the test.
        self.user = User.objects.create_user(username='efg', password='somepassword')
        self.userB = User.objects.create_user(username='abc', password='somepassword2')
        Tweet.objects.create(content="test first tweet", user=self.user) # adding tweet objects to test the tweet list
        Tweet.objects.create(content="test third tweet", user=self.user) # adding tweet objects to test the tweet list
        Tweet.objects.create(content="test fourth tweet", user=self.userB) # adding tweet objects to test the tweet list -> id =3
        self.currentCount = Tweet.objects.all().count()


    def test_user_created(self):
        # user = User.objects.get(username='efg')
        self.assertEqual(self.user.username, "efg") # assert Equal comes inhereted from TestCase
        # self.assertEqual(1, 2)


    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(content="test second tweet", user=self.user)
        # self.assertEqual(tweet_obj.id, 1)
        self.assertEqual(tweet_obj.id, 4) # adding tweet objects to test the tweet list
        self.assertEqual(tweet_obj.user, self.user)


    def test_api_login(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')


    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client


    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200) # should login and get how many tweets there
        self.assertEqual(len(response.json()), 3)
        # print(response.json())

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 1, "action": "like"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 1)
        # print(response.json())


    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 2, "action": "like"}) # I have to first hit like then unlike it
        self.assertEqual(response.status_code, 200)
        response = client.post("/api/tweets/action/", {"id": 2, "action": "unlike"}) #first test failed because it is not sending a response!!
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 0)
        # print(response.json())


    def test_action_retweet(self):
        client = self.get_client()
        currentCount = self.currentCount
        response = client.post("/api/tweets/action/", {"id": 2, "action": "retweet"})
        self.assertEqual(response.status_code, 201)  # Below testing the id is incremented
        data = response.json()
        new_tweet_id = data.get("id")
        self.assertNotEqual(2, new_tweet_id)
        self.assertEqual(currentCount + 1, new_tweet_id) # after creating the objects above, retweeting should add the number of objects


    def test_tweet_create_api_view(self):
        request_data = {"content": "THis is a test tweet"}
        client = self.get_client()
        response = client.post("/api/tweets/create/", request_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        new_tweet_id = response_data.get("id")
        self.assertEqual(self.currentCount + 1, new_tweet_id)


    def test_tweet_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/tweets/1/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        _id = data.get("id")
        self.assertEqual(_id, 1)


    def test_tweet_delete(self):
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 200)
        # data = response.json()
        # _id = data.get("id")
        # self.assertEqual(_id, 1)
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 404)


        response_incorrect_user = client.delete("/api/tweets/3/delete/")
        self.assertEqual(response_incorrect_user.status_code, 401) # Permission error
