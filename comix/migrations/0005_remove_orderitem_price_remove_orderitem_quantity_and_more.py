# Generated by Django 5.1.1 on 2025-03-17 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comix', '0004_rename_name_product_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='price',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='quantity',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='total',
        ),
    ]
