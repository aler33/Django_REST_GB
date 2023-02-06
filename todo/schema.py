import graphene
from graphene_django import DjangoObjectType
from todo_work.models import Todo, Project
from users.models import CustomUser


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    
    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)