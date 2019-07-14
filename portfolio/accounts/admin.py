from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from accounts.models import *

class CustomUserAdmin(UserAdmin):
    list_display = (
        "username",
        "first_name",
        "last_name",
        "email",
    )

    fieldsets = (
        (
            'Custom Personal Information', {
                'fields': (
                    ('first_name', 'last_name',),
                    'username',
                    'password',
                    'email',
                    'description'
                )
            }
        ), (
            'Socials', {
                'fields': (
                    'github_link',
                    'linkedin_link',
                )
            }
        ), (
            'Login Information', {
                'fields': (
                    'last_login',
                    'access_token',
                    'refresh_token',
                    'expires_in',
                    'token_type',
                )
            }
        )
    )

class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        "company_name",
        "role",
        "duration",
    )

    search_fields = ("company_name", )

class EducationAdmin(admin.ModelAdmin):
    list_display = (
        "college_name",
        "course",
        "duration",
    )

    search_fields = ("college_name", )

class SkillAdmin(admin.ModelAdmin):
    list_display = (
        'skill_name',
        'skill_type' 
    )

    search_fields = ("skill_name", )

class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "project_name",
        "duration",
    )

    search_fields = ("project_name", )

class VolunteerAdmin(admin.ModelAdmin):
    list_display = (
        "volunteer_name",
        "organization",
    )

    search_fields = ("volunteer_name", )

admin.site.register(Experience, ExperienceAdmin)
admin.site.register(Education, EducationAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Volunteer, VolunteerAdmin)
admin.site.register(User, CustomUserAdmin)