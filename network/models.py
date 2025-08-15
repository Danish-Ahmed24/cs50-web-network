from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField(
        'self',
        symmetrical=False,      
        related_name='followers'
    )




class Post(models.Model):
    post_creator = models.ForeignKey(User, on_delete=models.CASCADE,related_name='posts')
    post_content = models.TextField()
    post_creation_date = models.DateTimeField(default=timezone.now())
    posts_likes = models.ManyToManyField(User,blank=True,related_name='liked_posts')