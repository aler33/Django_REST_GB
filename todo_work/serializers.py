from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField, PrimaryKeyRelatedField
from .models import Todo, Project
from users.serializers import UsersModelSerializer


class TodoSerializer(ModelSerializer):
    # user = UsersModelSerializer()
    # user = ReadOnlyField(source='users.username')
    class Meta:
        model = Todo
        fields = "__all__"


class ProjectSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)
    # users = UsersModelSerializer(many=True)
    # users = PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Project
        fields = "__all__"

    def to_internal_value(self, value):
        return value
        