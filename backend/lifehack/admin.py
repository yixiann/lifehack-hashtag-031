from django.contrib import admin
from .models import Test

class TestAdmin(admin.ModelAdmin):
    list_display = ('text', 'number')

# Register your models here.
admin.site.register(Test, TestAdmin)