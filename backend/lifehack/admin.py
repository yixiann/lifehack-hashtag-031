from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Test, Chat, App, Class

class UserAdmin(UserAdmin):
    list_display = ('username', 'role')

class TestAdmin(admin.ModelAdmin):
    list_display = ('text', 'number')

class ChatAdmin(admin.ModelAdmin):
    list_display = ('fromAddress', 'toAddress', 'text', 'date', 'comments', 'attachments')

class AppAdmin(admin.ModelAdmin):
    list_display = ('yes', 'no', 'toofast', 'tooslow', 'comments', 'fromAddress')

class ClassAdmin(admin.ModelAdmin):
    list_display = ('classid', 'zoomlink', 'teacher', 'subject', 'remarks', 'datestart', 'dateend')

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Test, TestAdmin)
admin.site.register(Chat, ChatAdmin)
admin.site.register(App, AppAdmin)
admin.site.register(Class, ClassAdmin)
