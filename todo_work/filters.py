from django_filters import rest_framework as filters
from django_filters.widgets import RangeWidget
from .models import Project, Todo


class ProjectFilter(filters.FilterSet):
     name = filters.CharFilter(lookup_expr='contains')

     class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filters.FilterSet):
     text = filters.CharFilter(lookup_expr='contains')
     created = filters.DateFromToRangeFilter(widget=RangeWidget(attrs={'placeholder': 'YYYY-MM-DD'}))
     class Meta:
        model = Todo
        fields = ['text', 'project', 'created']