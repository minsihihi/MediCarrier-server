from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

<<<<<<< HEAD
class User(AbstractUser):
    nickname=models.CharField(max_length=20)

    def __str__(self):
        return self.nickname
    
=======

class User(AbstractUser):
    nickname = models.CharField(max_length=20)

    def __str__(self):
        return self.nickname
>>>>>>> 2a78fb1403210baaa7cc084b8d29ff8466d7c0c1
