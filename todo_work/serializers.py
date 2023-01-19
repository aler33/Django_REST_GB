from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Todo, Project
from users.serializers import UsersModelSerializer


class TodoSerializer(ModelSerializer):
    user = UsersModelSerializer()
    class Meta:
        model = Todo
        fields = "__all__"


class ProjectSerializer(ModelSerializer):
    users = UsersModelSerializer(many=True)
    class Meta:
        model = Project
        fields = "__all__"
        