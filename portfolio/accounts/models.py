from django.db import models
from django.contrib.auth.models import AbstractUser
from django.urls import reverse
from django.db.models.signals import pre_save
from django.core.exceptions import ValidationError

class Experience(models.Model):
    order        = models.IntegerField(default = 0)
    company_name = models.CharField(max_length = 200)
    duration     = models.CharField(max_length = 200)
    role         = models.CharField(max_length = 200)
    display_url  = models.CharField(max_length = 200, blank = True, null = True)
    url          = models.CharField(max_length = 200, blank = True, null = True)
    description  = models.TextField()

    class Meta:
        ordering = [
            "company_name"
        ]

    def __str__(self):
        return "{}".format(self.company_name).strip()

class User(AbstractUser):
    # User demographic attributes
    email           = models.EmailField(max_length = 255, unique = True)
    first_name      = models.CharField(max_length = 100)
    last_name       = models.CharField(max_length = 100)
    last_login      = models.DateTimeField(blank = True, null = True)
    access_token    = models.CharField(max_length = 200, blank = True)
    refresh_token   = models.CharField(max_length = 200, blank = True)
    expires_in      = models.IntegerField(blank = True, default = 0)
    token_type      = models.CharField(max_length = 20, blank = True)

    class Meta:
        ordering = [
            "first_name", 
            "last_name",
        ]

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name).strip()