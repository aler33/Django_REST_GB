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


class TodoMutation(graphene.Mutation):
    class Arguments:
        is_active = graphene.Boolean(required=True)
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, is_active, id):
        todo = Todo.objects.get(id=id)
        todo.is_active = is_active
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoMutation.Field()


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    user_by_username = graphene.Field(UserType, username=graphene.String(required=True))
    user_by_projectid = graphene.List(UserType, id=graphene.Int(required=False))
    
    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_by_username(root, info, username):
        try:
            return CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return None

    def resolve_user_by_projectid(root, info, id=None):
        users = CustomUser.objects.all()
        if id:
            users = users.filter(project__id=id)
        return users
            

schema = graphene.Schema(query=Query, mutation=Mutation)