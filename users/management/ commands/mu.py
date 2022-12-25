from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "This command using for call 'loaddata' with flags:\n" "001_user_add.json"

    def handle(self, *args, **options):
        call_command("loaddata", "001_user_add.json")
