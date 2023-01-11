from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Todo, Project
from users.serializers import UsersModelSerializer


class TodoSerializer(HyperlinkedModelSerializer):
    user = UsersModelSerializer()
    class Meta:
        model = Todo
        fields = "__all__"


class ProjectSerializer(HyperlinkedModelSerializer):
    users = UsersModelSerializer(many=True)
    class Meta:
        model = Project
        fields = "__all__"