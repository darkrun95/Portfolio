from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token
from . import views

app_name = "api"

urlpatterns = [
    # path('users/',          views.UserList.as_view()),
    # path('users/<int:pk>/', views.UserDetail.as_view()),
    path('current_user/',   views.current_user),
    path('users/',          views.UserList.as_view()),
    path('forgot-password/',views.ForgotPassword.as_view()),
    path('reset-password/', views.ResetPassword.as_view()),
    path('validate-user/', 	views.ValidateUser.as_view()),
    path('token-auth/',     obtain_jwt_token),
]

urlpatterns = format_suffix_patterns(urlpatterns)
