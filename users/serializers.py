from rest_framework.serializers import HyperlinkedModelSerializer

from .models import CustomUser


class UsersModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",
            "firstname",
            "lastname",
            "email",
        )
