from rest_framework import serializers
from django.contrib.auth import get_user_model
import requests
import os
from django.utils.timezone import now
from accounts.models import *

class UserSerializer(serializers.ModelSerializer):
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

class UserTokenSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    def get_token(self, instance):
        if os.environ.get("ENVIRONMENT") == "develop":
            token_url = 'http://localhost:8000/o/token/'
            request_data = {
                'client_id': '73T6z658kOeQ4IKe27DGJyhQAdDzr0ptiKF69kLT',
                'client_secret': 'DX6uUhT72Bur4wNDWHWszoFsf3jqTI2BK9bHHk0OlXr5U10yFz4bOl0wAs89RXyg49cvQx1kT1RCUdfmD4wToQURsE6DMRg8XwCqRQJxjUYawYVqZv9N9lbvH5KHeeSb',
                'username': instance['username'],
                'password': instance['password'],
                'scope': 'write',
                'grant_type': 'password'
            }
        else:
            token_url = 'http://www.arunpottekat.me/o/token/'
            request_data = {
                'client_id': 'kC2rHP64JJE7IKOZy0lCBJqyAsnrYEfXUXubBRYc',
                'client_secret': '9iYnEMjc3Egnb9Pfz9wpizT5sg6E80XPT23D2XlcSPh7XAPOFAS5gPzGtaRQUma3X0kgJ1WCaEuypG59jzoWLW1ISrGkVfnI8W2YNSk0iR1UETKJW1ChVbpfd2MUq0c1',
                'username': instance['username'],
                'password': instance['password'],
                'scope': 'write',
                'grant_type': 'password'
            }

        request = requests.post(token_url, data=request_data)
        return request.json()

    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'token'
        ]

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'