from django.contrib import admin
from .models import *



class ComixAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'description', 'imag', 'link')
    search_fields = ('id', 'title')
    list_filter = ('id', 'title')

admin.site.register(Comix, ComixAdmin)

