from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework import status

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers

User = get_user_model()

class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    def get(self, request, format=None):
        serializer = serializers.UserSerializer(User.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)