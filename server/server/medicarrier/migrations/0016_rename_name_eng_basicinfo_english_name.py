# Generated by Django 5.0.7 on 2024-08-05 13:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicarrier', '0015_script_created_at_alter_trip_insurancetype'),
    ]

    operations = [
        migrations.RenameField(
            model_name='basicinfo',
            old_name='name_eng',
            new_name='english_name',
        ),
    ]
