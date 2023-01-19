from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from .models import CustomUser


class UsersModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "id",            
            "username",
            "firstname",
            "lastname",
            "email",
        )
