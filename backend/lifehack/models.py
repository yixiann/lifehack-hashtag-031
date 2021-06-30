from django.db import models

# Create your models here.

class Test(models.Model):
    text = models.CharField(max_length=120)
    number = models.IntegerField()

    def __str__ (self):
        return f'{self.text} and {str(self.number)}'