from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from users.views import UserModelViewSet, UserListAPIView
from todo_work.views import TodoModelViewSet, ProjectModelViewSet
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from graphene_django.views import GraphQLView

router = DefaultRouter()
router.register("users", UserModelViewSet)
router.register("todo", TodoModelViewSet)
router.register("project", ProjectModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Todo",
        default_version='1',
        description="Documentation to our project",
        contact=openapi.Contact(email="admin@local.ru"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),   
    path('api-token-auth/', views.obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    re_path(r'^api/(?P<version>\d)/users/$', UserListAPIView.as_view()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
]
