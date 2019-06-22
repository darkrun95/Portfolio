from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotAuthenticated

from django.core.mail import send_mail
from django.template.loader import render_to_string

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponseRedirect
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers
from .custom.custom_pagination import CustomPagination
import json, datetime

User = get_user_model()

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = serializers.UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        if self.request.user.is_superuser:
            serializer = serializers.UserSerializer(User.objects.all(), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise NotAuthenticated(detail='User Access Denied')
            return

    def post(self, request, format=None):
        serializer = serializers.UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ForgotPassword(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        email = request.data["email"]
        user_set = User.objects.filter(email=email)
        user = user_set.first()
        user_exists = user_set.exists()
        if not user_exists:
            return Response(status=status.HTTP_302_FOUND)
        else:
            serializer = serializers.UserSerializerForgotPassword(instance=user, data=request.data)

            if serializer.is_valid():
                serializer.save()
                email = {
                    'from': 'no-reply@inintoku.me',
                    'to': [user.email],
                    'subject': 'Reset Password',
                    'message': 'Reset Password Link: {}/resetpassword/{}/{}'.format(request.get_host(), 
                                                                                    user.id, 
                                                                                    user.reset_token)
                }
                send_mail(email['subject'], email['message'], email['from'], email['to'])

                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPassword(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        user = User.objects.get(id=request.data["id"])

        data = {
            "id": request.data["id"],
            "reset_token": request.data["reset_token"],
            "password": request.data["password"],
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username,
        }

        if int(request.data["reset_token"]) == user.reset_token:
            serializer = serializers.UserSerializerWithToken(instance=user, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_302_FOUND)

class ValidateUser(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        user = User.objects.get(id=request.data["id"])
        user_serializer = {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        }

        if int(request.data["validationtoken"]) == user.validation_token:
            try:
                user.validation_token = None
                user.user_validated = True
                user.validation_tstamp = None
                user.save()

                serializer = serializers.UserSerializer(user_serializer)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_302_FOUND)