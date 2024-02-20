from django.shortcuts import render
from rest_framework import viewsets 
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    # Para popular as views
    queryset = Post.objects.all() 
class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    # Para popular as views
    queryset = Comment.objects.all() 
