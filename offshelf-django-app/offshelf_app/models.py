from django.contrib.auth.models import User
from django.db import models

class Audio(models.Model):
    title = models.CharField(max_length=255)
    audio_file = models.FileField(upload_to='audio/')


class Image(models.Model):
    title = models.CharField(max_length=255)
    image_file = models.ImageField(upload_to='images/')


class ItemInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)  # Add this line
    name = models.CharField(max_length=255, blank=False, null=False)
    type = models.TextField(blank=False, null=False)
    expiry_date = models.BigIntegerField(default=123456789, blank=False, null=False)
    quantity = models.IntegerField(blank=False, null=False)
    image_file = models.BinaryField(blank=False, null=False, default=b'')
