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

class Chat(models.Model):
    fromAddress = models.CharField(max_length=120)
    toAddress = models.CharField(max_length=120)
    text = models.CharField(blank=True, max_length=1000)
    date = models.DateTimeField(auto_now_add=True)
    attachments = models.ImageField(upload_to='attachments', blank=True, null=True)

    def __str__ (self):
        return f'From: {self.fromAddress} To: {self.toAddress} Text: {self.text} Date: {str(self.date)} Attachments: {self.attachments}'