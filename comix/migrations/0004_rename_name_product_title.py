# Generated by Django 5.1.1 on 2025-03-17 10:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comix', '0003_alter_orderitem_quantity'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='name',
            new_name='title',
        ),
    ]
