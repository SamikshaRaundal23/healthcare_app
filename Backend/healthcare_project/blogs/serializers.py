from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'summary',       
            'image',         
            'created_at',    
            'author'         
        ]
