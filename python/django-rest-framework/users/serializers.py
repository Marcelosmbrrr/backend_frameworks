from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'active', 'image', 'role_id', 'created_at', 'updated_at']