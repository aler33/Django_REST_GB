from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins

from .models import CustomUser
from .serializers import UsersModelSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UsersModelSerializer
