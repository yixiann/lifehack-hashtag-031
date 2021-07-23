# Generated by Django 3.1.7 on 2021-07-23 17:17

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fromAddress', models.CharField(max_length=120)),
                ('toAddress', models.CharField(max_length=120)),
                ('text', models.CharField(blank=True, max_length=1000)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('comments', models.CharField(blank=True, max_length=1000)),
                ('attachments', models.ImageField(blank=True, null=True, upload_to='attachments')),
            ],
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('classid', models.CharField(blank=True, max_length=100)),
                ('zoomlink', models.CharField(blank=True, max_length=10000)),
                ('teacher', models.CharField(blank=True, max_length=120)),
                ('subject', models.CharField(blank=True, max_length=120)),
                ('remarks', models.CharField(blank=True, max_length=1000)),
                ('datestart', models.DateTimeField(blank=True)),
                ('dateend', models.DateTimeField(blank=True)),
                ('classname', models.CharField(blank=True, max_length=100)),
                ('createdby', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=120)),
                ('number', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='App',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('yes', models.CharField(blank=True, max_length=120)),
                ('no', models.CharField(blank=True, max_length=120)),
                ('toofast', models.CharField(blank=True, max_length=120)),
                ('tooslow', models.CharField(blank=True, max_length=120)),
                ('comments', models.CharField(blank=True, max_length=1000)),
                ('attachments', models.ImageField(blank=True, null=True, upload_to='attachments')),
                ('fromAddress', models.CharField(max_length=120)),
                ('classid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lifehack.class')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('type', models.CharField(default='Student', max_length=100)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
