from django import forms

from .models import Tweet

MAX_TWEET_LENGTH = 240

class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']
    
    def clean_content(self):
        """ This going to validate the content to a strict 240 char length """
        content = self.cleaned_data.get("content")
        if len(content) > MAX_TWEET_LENGTH:
            raise forms.ValidationError("This tweet is too long! Max limit 240 charaters.")
        return content
