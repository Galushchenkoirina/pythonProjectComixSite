from django.urls import path, include
from django.contrib import admin
from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter
from .views import ComixViewSet
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from .views import *


router = DefaultRouter()
router.register('api', ComixViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
    # path('home/', HomeView.as_view(), name='home'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]


