from django.urls import path
from .views import BlogListAPIView
from .views import patient_blog_list

urlpatterns = [
    path('list/', BlogListAPIView.as_view(), name='blog-list'),
     path('patient/blogs/', patient_blog_list), 
]


