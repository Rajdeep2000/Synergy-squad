from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Audio, Image, ItemInfo
import logging

logger = logging.getLogger(__name__)

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class ItemInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemInfo
        fields = '__all__'


class ItemInfoSerializerByType(serializers.ModelSerializer):
    class Meta:
        model = ItemInfo
        fields = ('type',)

class ItemInfoSerializerByName(serializers.ModelSerializer):
    class Meta:
        model = ItemInfo
        fields = ('name',)
