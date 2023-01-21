from django.contrib import admin
from users import models as user_model
from todo_work.models import Todo, Project


# admin.site.register(user_model.CustomUser)

@admin.register(user_model.CustomUser)
class NewAdmin(admin.ModelAdmin):
    pass

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    pass

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    pass
