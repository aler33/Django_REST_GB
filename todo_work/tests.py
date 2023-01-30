import json
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth import get_user_model
from .views import TodoModelViewSet, ProjectModelViewSet
from users.views import UserModelViewSet
from .models import Todo, Project
from users.models import CustomUser

User = get_user_model()

class TestTodoViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/project/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):    
        factory = APIRequestFactory()        
        request = factory.post('/api/project/', {"id":21,"users":{"00000000-0000-0000-0000-000000000001"},"name":"test_1","url":"https://www.test1.com/test.html"}, format='json')                
        view = ProjectModelViewSet.as_view({'post': 'create'})        
        response = view(request)        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_create_admin(self):
        factory = APIRequestFactory()
        request_user = factory.post('/api/users/', {'id': '00000000-0000-0000-0000-000000000001',
            'username': 'user33',
            'email': 'user33@local.ru'}, format='json')
        request = factory.post('/api/project/', {"id":21,"users":{"00000000-0000-0000-0000-000000000001"},"name":"test_1","url":"https://www.test1.com/test.html"}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@test.com', '123')
        force_authenticate(request_user, admin)
        force_authenticate(request, admin)
        view_user = UserModelViewSet.as_view({'post': 'create'})
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response_user = view_user(request_user)
        response = view(request)
        self.assertEqual(response_user.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = User.objects.create(id='00000000-0000-0000-0000-000000000002',
        username='user22',
        email='user22@local.ru')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_guest_edit(self):
        user = User.objects.create(id='00000000-0000-0000-0000-000000000003',
        username='user3',
        email='user3@local.ru')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'username':'user0', 'email':'user0@local.ru'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        user = User.objects.create(id='00000000-0000-0000-0000-000000000004',
        username='user4',
        email='user4@local.ru')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@test.com', '123')
        client.login(username='admin', password='123')
        response = client.put(f'/api/users/{user.id}/', {'username':'user5', 'email':'user5@local.ru'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(id=user.id)
        self.assertEqual(user.username, 'user5')
        client.logout()

