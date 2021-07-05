from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    pass

class Test(models.Model):
    text = models.CharField(max_length=120)
    number = models.IntegerField()

    def __str__ (self):
        return f'{self.text} and {str(self.number)}'