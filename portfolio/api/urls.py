from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token
from . import views

app_name = "api"

urlpatterns = [
    path('token-auth/',						views.TokenAuthorization.as_view()),
    path('login/',							views.UserLogin.as_view()),
    path('check-authenticated/<str:id>/', 	views.CheckAuthentication.as_view()),

    path('users/',      		views.UserView.as_view()),
    path('experience-list/', 	views.ExperienceList.as_view()),
    path('education-list/', 	views.EducationList.as_view()),
    path('project-list/', 		views.ProjectList.as_view()),
    path('skill-list/', 		views.SkillList.as_view()),
    path('volunteer-list/', 	views.VolunteerList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
