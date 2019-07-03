from django.urls import path, re_path
from . import views

app_name = "frontend"

urlpatterns = [
    path('', views.index),
    re_path(r'^experience/', 	views.index),
    re_path(r'^education/', 	views.index),
    re_path(r'^projects/', 		views.index),
    re_path(r'^volunteering/', 	views.index),
    re_path(r'^manage/',		views.index),
]
