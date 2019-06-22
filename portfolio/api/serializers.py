from rest_framework import serializers

from django.contrib.auth import get_user_model
from rest_framework_jwt.settings import api_settings
from random import randint
from django.utils.timezone import now

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
        ]

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)

        return token

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        print(validated_data)
        if password is not None:
            instance.reset_token = None
            instance.reset_token_on = None
            instance.set_password(password)
            instance.save()
        return instance

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
            instance.user_validated = False
            instance.validation_token = randint(1000000, 9999999)
            instance.validation_tstamp = now()

        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'token',
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
        ]

class UserSerializerForgotPassword(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.reset_token = randint(1000000, 9999999)
        instance.reset_token_on = now()
        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'email',
            'reset_token',
        ]
