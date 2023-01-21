from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from users.views import UserModelViewSet
from todo_work.views import TodoModelViewSet, ProjectModelViewSet
from rest_framework.authtoken import views

router = DefaultRouter()
router.register("users", UserModelViewSet)
router.register("todo", TodoModelViewSet)
router.register("project", ProjectModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),   
    path('api-token-auth/', views.obtain_auth_token),
]
