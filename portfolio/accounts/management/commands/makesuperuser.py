from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from datetime import datetime

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User = get_user_model()
        if not User.objects.filter(username="arun").exists():
            User.objects.create_superuser(
                username = "arun",
                email = "pottekatarun1995@gmail.com",
                password = "arun123",
                first_name = "Arun",
                last_name = "Pottekat"
            )
