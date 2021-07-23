from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):  
    type = models.CharField(max_length=100, default="Student")

    def __str__ (self):
        return f'{self.username} is a {self.type}'

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

class App (models.Model):
    yes = models.CharField(max_length=120, blank=True)
    no = models.CharField(max_length=120, blank=True)
    toofast = models.CharField(max_length=120, blank=True)
    tooslow = models.CharField(max_length=120, blank=True)
    comments = models.CharField(max_length=10000, blank=True)
    fromAddress = models.CharField(max_length=120)

    def __str__ (self):
        return f'Yes: {self.yes}, No: {self.no}, Too Fast: {self.toofast}, Too Slow: {self.tooslow}, Comments: {self.comments}, From: {self.fromAddress}'

class Calendar (models.Model):
    classid = models.IntegerField(blank=True)
    zoomlink = models.CharField(max_length=10000, blank=True)
    teacher = models.CharField(max_length=120, blank=True)
    subject = models.CharField(max_length=120, blank=True)
    datestart = models.DateTimeField(blank=True)
    dateend = models.DateTimeField(blank=True)

    def __str__ (self):
        return f'Class ID: {str(self.classid)}, Zoom Link: {self.zoomlink}, Teacher: {self.teacher}, Subject: {self.subject}, Date Start: {str(self.datestart)}, Date End: {str(self.dateend)}'