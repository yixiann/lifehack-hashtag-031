from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Test, Chat

class UserAdmin(UserAdmin):
    pass

class TestAdmin(admin.ModelAdmin):
    list_display = ('text', 'number')

class ChatAdmin(admin.ModelAdmin):
    list_display = ('fromAddress', 'toAddress', 'text', 'date')

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Test, TestAdmin)
admin.site.register(Chat, ChatAdmin)
