# Generated by Django 3.2 on 2023-01-15 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_work', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]