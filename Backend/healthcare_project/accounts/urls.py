from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import BlogListView
from .views import doctor_profile
from .views import CustomTokenObtainPairView
from .views import api_patient_blog_list
from django.urls import path, include
from .views import SignupAPIView


urlpatterns = [
    # HTML Views
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('patient/dashboard/', views.patient_dashboard, name='patient_dashboard'),
    path('doctor/dashboard/', views.doctor_dashboard, name='doctor_dashboard'),
    path('doctor/blogs/', views.doctor_blog_list, name='doctor_blog_list'),
    path('doctor/blogs/create/', views.doctor_blog_create, name='doctor_blog_create'),
    path('patient/blogs/', views.patient_blog_list, name='patient_blog_list'),
    path('patient/blogs/<int:blog_id>/', views.patient_blog_detail, name='patient_blog_detail'),
    path('patient/doctors/', views.doctor_list, name='doctor_list'),
    path('patient/book_appointment/<int:doctor_id>/', views.book_appointment, name='book_appointment'),
    path('patient/appointment_confirmed/<int:appointment_id>/', views.appointment_confirmed, name='appointment_confirmed'),
    # API Views

     path('api/signup/', SignupAPIView.as_view(), name='api-signup'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/doctor/profile/', views.api_doctor_profile, name='api_doctor_profile'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/signup/', views.api_signup, name='api_signup'),
    path('api/login/', views.api_user_login, name='api_login'),
    path('api/patient/appointments/', views.api_patient_appointments, name='api_patient_appointments'),
    path('api/doctor/appointments/', views.api_doctor_appointments, name='api_doctor_appointments'),
    path('api/doctor/blogs/', views.api_doctor_blog_list, name='api_doctor_blog_list'),
     path('api/blogs/', BlogListView.as_view(), name='blog-list'),
    path('api/doctor/blogs/create/', views.api_doctor_blog_create, name='api_doctor_blog_create'),
    path('api/doctor/blogs/<int:blog_id>/', views.api_doctor_blog_update, name='api_doctor_blog_update'),  
    path('api/doctor/blogs/<int:blog_id>/delete/', views.api_doctor_blog_delete, name='api_doctor_blog_delete'),
    path('api/patient/blogs/', views.api_patient_blog_list, name='api_patient_blog_list'),
    path('api/patient/blogs/<int:blog_id>/', views.api_patient_blog_detail, name='api_patient_blog_detail'),
    path('api/patient/doctors/', views.api_doctor_list, name='api_doctor_list'),
    path('api/patient/doctors/<int:doctor_id>/', views.api_doctor_detail, name='api_doctor_detail'),
    path('api/patient/appointment_confirmed/<int:appointment_id>/', views.api_appointment_confirmed, name='api_appointment_confirmed'),
    path('api/patient/book_appointment/<int:doctor_id>/', views.api_book_appointment, name='api_book_appointment'),
    path('api/logout/', views.api_user_logout, name='api_logout'),
    path('api/blogs/', include('blogs.urls')),
    path('api/', include('blogs.urls')),


]

