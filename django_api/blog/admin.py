from django.contrib import admin
from .models import *

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'user')

# Register your models here.
admin.site.register(Post,PostAdmin)
admin.site.register(Categoria)
admin.site.register(ProfilePic)
admin.site.register(Comment)
