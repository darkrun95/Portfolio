from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = "api"

urlpatterns = [
    path('token-auth/',						views.TokenAuthorization.as_view()),
    path('check-authenticated/<str:id>/', 	views.CheckAuthentication.as_view()),
 
    path('project-list/', 		views.ProjectList.as_view()),
    path('skill-list/', 		views.SkillList.as_view()),

    path('users/',              views.UserView.as_view()),
    path('profile/image/',		views.ProfileImage.as_view()),

    path('education-list/',     views.EducationList.as_view()),
    path('education/',          views.EducationItem.as_view()),
    path('education/<int:id>/', views.EducationItem.as_view()),

    path('experience-list/',    views.ExperienceList.as_view()),   
    path('experience/',         views.ExperienceItem.as_view()),
    path('experience/<int:id>/',views.ExperienceItem.as_view()),

    path('volunteer-list/',     views.VolunteerList.as_view()),
    path('volunteer/',          views.VolunteerItem.as_view()),
    path('volunteer/<int:id>/', views.VolunteerItem.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
