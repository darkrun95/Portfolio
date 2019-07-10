from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User
from django import forms
from accounts.models import *

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

    def clean_username(self):
        username = self.cleaned_data['username']
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError(self.error_messages['duplicate_username'])

class CustomUserAdmin(UserAdmin):
    form      = CustomUserChangeForm
    add_form  = CustomUserCreationForm
    
    list_display = (
        "username",
        "first_name",
        "last_name",
        "email",
    )

class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        "company_name",
        "role",
        "duration",
    )

    search_fields = ("company_name", )

admin.site.register(Experience, ExperienceAdmin)
admin.site.register(User, CustomUserAdmin)