from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework import status

from rest_framework import permissions
from rest_framework.exceptions import NotAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers
from accounts.models import *
from oauth2_provider.models import AccessToken, RefreshToken
from django.utils import timezone

User = get_user_model()

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def get(self, request, format=None):
        user = User.objects.get(username='arun')
        data = {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'description': user.description,
            'github_link': user.github_link,
            'linkedin_link': user.linkedin_link,
            'profile_image': user.profile_image if user.profile_image else None,
        }

        serializer = serializers.UserSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = User.objects.get(username=request.user.username)
        data = {
            'email': request.data['email'],
            'first_name': request.data['first_name'],
            'last_name': request.data['last_name'],
            'description': request.data['description'],
            'github_link': request.data['github_link'],
            'linkedin_link': request.data['linkedin_link'],
            'profile_image': user.profile_image,
        }

        serializer = serializers.UserSerializer(instance = request.user, data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TokenAuthorization(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        user_qs = User.objects.filter(username = request.data['username'])
        if user_qs.exists():
            user = user_qs.first()
            refresh_token = RefreshToken.objects.filter(token = user.refresh_token)

            data = {
                'username': request.data['username'],
                'password': request.data['password'],
                'refresh_token': refresh_token.first().token if refresh_token.exists() else None,
            }
            serializer = serializers.TokenSerializer(data)

            login_data = {
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'access_token': serializer.data['token']['access_token'],
                'expires_in': serializer.data['token']['expires_in'],
                'token_type': serializer.data['token']['token_type'],
                'refresh_token': serializer.data['token']['refresh_token'],
            }
            token_serializer = serializers.UserTokenSerializer(instance = user, data = login_data)
            if token_serializer.is_valid():
                token_serializer.save()
                return Response(token_serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_412_PRECONDITION_FAILED)

class CheckAuthentication(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, id, format=None):
        user = User.objects.filter(access_token = id)
        if user.exists():
            try:
                access_token = AccessToken.objects.get(token = id)
                token_expiration = access_token.expires

                if token_expiration > timezone.now():
                    return Response({'status': 'ok'}, status=status.HTTP_200_OK)
            except Exception as e:
                print("Access Token not present")
        return Response({'status': 'invalid'}, status=status.HTTP_401_UNAUTHORIZED)

class ExperienceList(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        experience_list = Experience.objects.all()
        if experience_list.exists():
            serializer = serializers.ExperienceSerializer(experience_list, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ExperienceItem(APIView):
    def get(self, request, id=None, format=None):
        try:
            experience_item = Experience.objects.get(id = id)
            serializer = serializers.ExperienceSerializer(experience_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def post(self, request, id=None, format=None):
        if id is not None:
            experience_item = Experience.objects.get(id = id)
            serializer = serializers.ExperienceSerializer(instance = experience_item, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        else:
            serializer = serializers.ExperienceSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, id, format=None):
        try:
            experience_item = Experience.objects.get(id = id)
            experience_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class EducationList(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        education_list = Education.objects.all()
        if education_list.exists():
            serializer = serializers.EducationSerializer(education_list, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class EducationItem(APIView):
    def get(self, request, id=None, format=None):
        try:
            education_item = Education.objects.get(id = id)
            serializer = serializers.EducationSerializer(education_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def post(self, request, id=None, format=None):
        if id is not None:
            education_item = Education.objects.get(id = id)
            serializer = serializers.EducationSerializer(instance = education_item, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        else:
            serializer = serializers.EducationSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, id, format=None):
        try:
            education_item = Education.objects.get(id = id)
            education_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ProjectList(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        project_list = Project.objects.all()
        if project_list.exists():
            serializer = serializers.ProjectSerializer(project_list, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ProjectItem(APIView):
    def get(self, request, id=None, format=None):
        try:
            project_item = Project.objects.get(id = id)
            serializer = serializers.ProjectSerializer(project_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def post(self, request, id=None, format=None):
        if id is not None:
            project_item = Project.objects.get(id = id)
            serializer = serializers.ProjectSerializer(instance = project_item, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        else:
            serializer = serializers.ProjectSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, id, format=None):
        try:
            project_item = Project.objects.get(id = id)
            project_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class SkillList(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        skill_list = Skill.objects.all()
        if skill_list.exists():
            serializer = serializers.SkillSerializer(skill_list, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class VolunteerList(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        volunteer_list = Volunteer.objects.all()
        if volunteer_list.exists():
            serializer = serializers.VolunteerSerializer(volunteer_list, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class VolunteerItem(APIView):
    def get(self, request, id=None, format=None):
        try:
            volunteer_item = Volunteer.objects.get(id = id)
            serializer = serializers.VolunteerSerializer(volunteer_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def post(self, request, id=None, format=None):
        if id is not None:
            volunteer_item = Volunteer.objects.get(id = id)
            serializer = serializers.VolunteerSerializer(instance = volunteer_item, data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        else:
            serializer = serializers.VolunteerSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, id, format=None):
        try:
            volunteer_item = Volunteer.objects.get(id = id)
            volunteer_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ProfileImage(APIView):
    def post(self, request, format=None):
        user = User.objects.get(username=request.user.username)
        data = {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'description': user.description,
            'github_link': user.github_link,
            'linkedin_link': user.linkedin_link,
            'profile_image': request.data['file'],
        }

        serializer = serializers.UserSerializer(instance = request.user, data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)