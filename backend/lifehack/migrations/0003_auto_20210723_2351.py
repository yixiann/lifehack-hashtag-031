# Generated by Django 3.1.7 on 2021-07-23 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lifehack', '0002_auto_20210723_2124'),
    ]

    operations = [
        migrations.AlterField(
            model_name='class',
            name='classid',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
