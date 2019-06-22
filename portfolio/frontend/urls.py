from django.urls import path, re_path
from . import views

app_name = "frontend"

urlpatterns = [
    path('', views.index),
    re_path(r'^login/',     	views.index),
    re_path(r'^logout/',    	views.index),
    re_path(r'^sign-up/',   	views.index),
    re_path(r'^forgot/',    	views.index),
    re_path(r'^resetpassword/', views.index),
    re_path(r'^validateuser/', 	views.index),
]
