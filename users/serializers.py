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


class UsersModelSerializerNew(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "id",            
            "username",
            "firstname",
            "lastname",
            "email",
            "is_superuser",
            "is_staff"
        )
        