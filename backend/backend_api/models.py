from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    created_at = models.DateTimeField(auto_now_add=True)
    # username, email, password fields are inherited from AbstractUser

    def __str__(self):
        return self.username

class Hotel(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price_per_night = models.BigIntegerField()
    currency = models.CharField(max_length=20)
    phone = models.CharField(max_length=255)
    image = models.ImageField(upload_to="temp/", blank=True, null=True)

    def __str__(self):
        return self.name