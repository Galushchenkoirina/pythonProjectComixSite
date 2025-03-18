from django.db import models
from django.contrib.auth.models import AbstractUser
from django.forms import CharField
from django.conf import settings

class Comix(models.Model):
    id = models.AutoField('ID', primary_key=True)
    title = models.TextField('Название', max_length=30)
    price = models.IntegerField('Цена')
    description = models.TextField('Описание', max_length=300)
    link = models.TextField('Изображение')
    imag = models.URLField('Ссылка')

    def __str__(self):
        return f'{self.id} | {self.title} | {self.price} | {self.description} | {self.link}| {self.imag}'

    class Meta:
        verbose_name = 'комикс'
        verbose_name_plural = 'Каталог товоров'


class CustomUser(AbstractUser ):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)


class Order(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    payment_method = models.CharField(max_length=50)
    delivery_method = models.CharField(max_length=50)
    total = models.DecimalField(max_digits=10, decimal_places=2)  # Итоговая цена
    items = models.JSONField(default=list)  # Поле для хранения массива товаров


