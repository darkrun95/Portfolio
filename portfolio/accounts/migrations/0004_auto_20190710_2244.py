# Generated by Django 2.2.2 on 2019-07-10 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_experience'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='description',
            field=models.TextField(),
        ),
    ]