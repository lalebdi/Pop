from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Tweet

# Create your tests here.

User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self): # this method allows me to create all of the instances I need to create. Here I need to create a user to run the test.
        # User.objects.create_user(username='abc', password='somepassword')
        self.user = User.objects.create_user(username='efg', password='somepassword')

    def test_user_created(self):
        # user = User.objects.get(username='efg')
        self.assertEqual(self.user.username, "efg")