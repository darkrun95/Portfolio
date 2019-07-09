from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework import status

from rest_framework import permissions
from rest_framework.exceptions import NotAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers

User = get_user_model()

class UserView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        user = User.objects.get(username='arun')
        data = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        }
        serializer = serializers.UserSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        user = User.objects.get(username=request.data['username'])
        data = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'access_token': request.data['access_token'],
            'expires_in': request.data['expires_in'],
            'token_type': request.data['token_type'],
            'refresh_token': request.data['refresh_token'],
        }

        serializer = serializers.UserSerializer(instance = user, data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TokenAuthorization(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        user = User.objects.filter(username = request.data['username'])
        if user.exists():
            data = {
                'username': request.data['username'],
                'password': request.data['password'],
            }
            serializer = serializers.UserTokenSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_412_PRECONDITION_FAILED)

class CheckAuthentication(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, id, format=None):
        users = User.objects.filter(access_token = id)
        if users.exists():
            return Response({'status': 'ok'}, status=status.HTTP_200_OK)
        else:
            return Response({'status', 'invalid'}, status=status.HTTP_400_BAD_REQUEST)