from rest_framework import viewsets, permissions
from rest_framework.response import Response

from posts.models import Post
from posts.serializers import PostSerializer
from posts.permissions import IsAuthorOfPost


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-create_at')
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfPost())

    def perform_create(self, serializer):
        # grab user that is creating a post an save it as author
        serializer.save(author=self.request.user)

        return super(PostViewSet, self).perform_create(serializer)


class AccountPostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('author').all()
    serializer_class = PostSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
