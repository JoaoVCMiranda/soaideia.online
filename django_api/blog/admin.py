from django.contrib import admin
from .models import *

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'user')

# Register your models here.
admin.site.register(Post,PostAdmin)
admin.site.register(Categorias)
admin.site.register(profile_pic)
admin.site.register(Comments)
