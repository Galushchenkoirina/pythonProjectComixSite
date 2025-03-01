from rest_framework import serializers
from .models import Comix, CustomUser
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenRefreshView

class ComixSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comix
        fields = ('id', 'title', 'description', 'price', 'imag', 'link')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = self.Meta.model(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Добавление дополнительного поля email в токен
        # token['email'] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Дополнительная валидация, если необходимо
        return data


# class CustomTokenRefreshView(TokenRefreshView):
#     def post(self, request, *args, **kwargs):
#         return super().post(request, *args, **kwargs)