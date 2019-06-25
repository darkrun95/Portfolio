from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token
from . import views

app_name = "api"

urlpatterns = [
    path('users/',          views.UserList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
