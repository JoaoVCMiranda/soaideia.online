from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Categorias(models.Model):
    nome = models.CharField(max_length=42, blank=True, help_text='Categorias' )
    def __str__(self):
        return self.nome

class profile_pic(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    prof_pic = models.ImageField(upload_to='media', blank=True) 

class Post(models.Model):
    
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    descr = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    comment_counter = models.IntegerField(default=0, blank=True)
    media = models.ImageField(upload_to='media', blank=True)
    
    categorias = models.ManyToManyField(Categorias)
    
    class Meta:
        ordering = ['-date']


    def __str__(self):
        return f'({self.id}):{self.title}'

class Comments(models.Model):
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0, blank=True)
    def __str__(self):
        return f'{self.user}@{self.post}'

