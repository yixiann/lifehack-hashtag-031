# Generated by Django 3.1.7 on 2021-07-23 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lifehack', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='type',
            field=models.CharField(default='Student', max_length=100),
        ),
    ]
