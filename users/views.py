from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins
from rest_framework.generics import ListAPIView

from .models import CustomUser
from .serializers import UsersModelSerializer, UsersModelSerializerNew


class UserModelViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UsersModelSerializer


class UserListAPIView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UsersModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2':
            return UsersModelSerializerNew
        return UsersModelSerializer
