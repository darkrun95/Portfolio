from rest_framework import serializers
from django.contrib.auth import get_user_model
import requests, os
from django.utils.timezone import now
from accounts.models import *
from django.conf import settings

class UserTokenSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.access_token = validated_data['access_token']
        instance.refresh_token = validated_data['refresh_token']
        instance.expires_in = validated_data['expires_in']
        instance.token_type = validated_data['token_type']
        instance.last_login = now()
        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'access_token',
            'expires_in',
            'token_type',
            'refresh_token',
        ]

class TokenSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    def get_token(self, instance):
        if instance['refresh_token'] is None:
            request_data = {
                'username': instance['username'],
                'password': instance['password'],
                'scope': 'write',
                'grant_type': 'password',
                'client_id': settings.CLIENT_ID,
                'client_secret': settings.CLIENT_SECRET,
            }
        else:
            request_data = {
                'grant_type': 'refresh_token',
                'client_id': settings.CLIENT_ID,
                'client_secret': settings.CLIENT_SECRET,
                'refresh_token': instance['refresh_token'],
            }

        if os.environ.get("ENVIRONMENT") == "develop":
            token_url = 'http://localhost:8000/o/token/'
        else:
            token_url = 'http://www.arunpottekat.me/o/token/'

        request = requests.post(token_url, data=request_data)
        return request.json()

    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'token'
        ]

class UserSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.email          = validated_data['email']
        instance.first_name     = validated_data['first_name']
        instance.last_name      = validated_data['last_name']
        instance.description    = validated_data['description']
        instance.github_link    = validated_data['github_link']
        instance.linkedin_link  = validated_data['linkedin_link']
        instance.profile_image  = validated_data['profile_image']
        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        fields = [
            'email',
            'first_name',
            'last_name',
            'description',
            'github_link',
            'linkedin_link',
            'profile_image',
        ]

class ExperienceSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.order          = validated_data['order']
        instance.company_name   = validated_data['company_name']
        instance.duration       = validated_data['duration']
        instance.role           = validated_data['role']
        instance.display_url    = validated_data['display_url']
        instance.url            = validated_data['url']
        instance.description    = validated_data['description']
        instance.save()
        return instance

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    class Meta:
        model = Experience
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.order        = validated_data['order']
        instance.college_name = validated_data['college_name']
        instance.duration     = validated_data['duration']
        instance.course       = validated_data['course']
        instance.description  = validated_data['description']
        instance.save()
        return instance

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    class Meta:
        model = Education
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()
    def get_skills(self, instance):
        return [skill.skill_name for skill in instance.skills.all()]

    class Meta:
        model = Project
        fields = [
            'order',
            'project_name',
            'duration',
            'project_link',
            'description',
            'skills',
        ]

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class VolunteerSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.order          = validated_data['order']
        instance.volunteer_name = validated_data['volunteer_name']
        instance.duration       = validated_data['duration']
        instance.organization   = validated_data['organization']
        instance.description    = validated_data['description']
        instance.save()
        return instance

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    class Meta:
        model = Volunteer
        fields = '__all__'
