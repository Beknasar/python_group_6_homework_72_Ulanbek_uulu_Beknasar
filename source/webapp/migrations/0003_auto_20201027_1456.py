# Generated by Django 2.2.13 on 2020-10-27 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0002_vote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='rating',
            field=models.IntegerField(choices=[(1, 'up'), (-1, 'down')], null=True, verbose_name='Рейтинг'),
        ),
    ]
