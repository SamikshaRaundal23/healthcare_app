from collections import defaultdict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Blog
from .serializers import BlogSerializer

#  Public blog list (optional)
class BlogListAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        blogs = Blog.objects.filter(is_draft=False).order_by('-created_at')
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

#  Patient dashboard blog list — category-wise
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def patient_blog_list(request):
    blogs = Blog.objects.filter(is_draft=False)
    grouped = defaultdict(list)
    for blog in blogs:
        category = blog.category.name if blog.category else 'Uncategorized'
        grouped[category].append(BlogSerializer(blog).data)
    return Response(grouped)
