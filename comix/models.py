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
    # USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = []


