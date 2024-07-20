from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
<<<<<<< HEAD
        fields = ['id', 'username', 'password' , 'nickname']
=======
        fields = ['id', 'username', 'password' , 'nickname']
>>>>>>> 2a78fb1403210baaa7cc084b8d29ff8466d7c0c1
