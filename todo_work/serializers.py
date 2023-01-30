from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Todo, Project
from users.serializers import UsersModelSerializer


class TodoSerializer(ModelSerializer):
    user = UsersModelSerializer()
    # user = ReadOnlyField(source='users.username')
    class Meta:
        model = Todo
        fields = "__all__"


class TodoSerializerBase(ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"


class ProjectSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)
    # users = UsersModelSerializer(many=True)
    class Meta:
        model = Project
        fields = "__all__"

    # def to_internal_value(self, value):
    #     return value
        