# Generated by Django 5.1.1 on 2025-03-18 10:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comix', '0008_delete_orderitem_delete_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='items',
            field=models.JSONField(default=list),
        ),
    ]
