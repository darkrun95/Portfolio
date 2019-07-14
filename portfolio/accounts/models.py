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

class Education(models.Model):
    order        = models.IntegerField(default = 0)
    college_name = models.CharField(max_length = 200)
    duration     = models.CharField(max_length = 200)
    course       = models.CharField(max_length = 200)
    description  = models.TextField()

    class Meta:
        ordering = [
            "college_name"
        ]

    def __str__(self):
        return "{}".format(self.college_name).strip()

class Skill(models.Model):
    SKILL_TYPES = (
        ('TOOLS', 'Tools'),
        ('INDUSTRY_KNOWLEDGE', 'Industry Knowledge')
    )

    skill_name = models.CharField(max_length = 20)
    skill_type = models.CharField(choices = SKILL_TYPES, max_length = 20, blank = True, default=SKILL_TYPES[0][0])

    class Meta:
        ordering = [
            'skill_name'
        ]

    def __str__(self):
        return "{}".format(self.skill_name).strip()

class Project(models.Model):
    order        = models.IntegerField(default = 0)
    project_name = models.CharField(max_length = 200)
    duration     = models.CharField(max_length = 200)
    project_link = models.CharField(max_length = 200)
    description  = models.TextField()
    skills       = models.ManyToManyField(Skill)    

    class Meta:
        ordering = [
            "project_name"
        ]

    def __str__(self):
        return "{}".format(self.project_name).strip()

class Volunteer(models.Model):
    order           = models.IntegerField(default = 0)
    volunteer_name  = models.CharField(max_length = 200)
    duration        = models.CharField(max_length = 200)
    organization    = models.CharField(max_length = 200)
    description     = models.TextField()  

    class Meta:
        ordering = [
            "volunteer_name",
        ]

    def __str__(self):
        return "{}".format(self.volunteer_name).strip()

class User(AbstractUser):
    # User demographic attributes
    email           = models.EmailField(max_length = 255, unique = True)
    first_name      = models.CharField(max_length = 100)
    last_name       = models.CharField(max_length = 100)
    description     = models.TextField(blank = True, null = True)
    github_link     = models.CharField(max_length = 100, blank = True)
    linkedin_link   = models.CharField(max_length = 100, blank = True)

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