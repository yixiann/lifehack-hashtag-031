from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Test, Chat, App, Calendar

class UserAdmin(UserAdmin):
    list_display = ('username', 'type')

class TestAdmin(admin.ModelAdmin):
    list_display = ('text', 'number')

class ChatAdmin(admin.ModelAdmin):
    list_display = ('fromAddress', 'toAddress', 'text', 'date', 'attachments')

class AppAdmin(admin.ModelAdmin):
    list_display = ('yes', 'no', 'toofast', 'tooslow', 'comments', 'fromAddress')

class CalendarAdmin(admin.ModelAdmin):
    list_display = ('classid', 'zoomlink', 'teacher', 'subject', 'datestart', 'dateend')

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Test, TestAdmin)
admin.site.register(Chat, ChatAdmin)
admin.site.register(App, AppAdmin)
admin.site.register(Calendar, CalendarAdmin)
