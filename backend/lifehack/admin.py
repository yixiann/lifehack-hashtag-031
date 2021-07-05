from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Test

class UserAdmin(UserAdmin):
    pass

class TestAdmin(admin.ModelAdmin):
    list_display = ('text', 'number')

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Test, TestAdmin)
