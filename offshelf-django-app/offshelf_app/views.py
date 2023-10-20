from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Audio, Image, ItemInfo
from .serializers import AudioSerializer, ImageSerializer, ItemInfoSerializer, ItemInfoSerializerByType, ItemInfoSerializerByName
from offshelf_app.speech_to_text.speechToText import extract_text
import logging
import base64

logger = logging.getLogger(__name__)


class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Access the uploaded audio file
        audio_file = serializer.instance.audio_file.path

        # Call your custom function to process the audio and generate a list
        processed_data = extract_text(audio_file)

        # Return the processed data as a response
        return Response({'message': 'Audio processing successful', 'data': processed_data})


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class ItemInfoViewSet(viewsets.ModelViewSet):
    queryset = ItemInfo.objects.all()
    serializer_class = ItemInfoSerializer

    # permission_classes = [IsAuthenticated]
    def create(self, request, **kwargs):
        data_list = request.data
        if self.request.user.is_authenticated is None:
            return Response({'error': "User Not Logged In."}, status=500)
        logger.debug(self.request.user.is_authenticated)
        for data in data_list:
            try:
                item_info = ItemInfo(
                    user=self.request.user,
                    name=data['name'],
                    type=data['type'],
                    expiry_date=data['expiry_date'],
                    quantity=data['quantity'],
                    image_file=base64.b64decode(data['image_file'])
                )
                item_info.save()
            except KeyError:
                return Response({'error': 'Invalid JSON data format.'}, status=400)

        # serializer = ItemInfoSerializer(item_info)
        return Response({'message': 'data uploaded'})


class ItemInfoViewSetExpiryRange(viewsets.ModelViewSet):
    serializer_class = ItemInfoSerializer
    queryset = ItemInfo.objects.all()  # Initial queryset

    def get_queryset(self):
        if self.request.user.is_authenticated is None:
            return Response({'error': "User Not Logged In."}, status=500)
        user = self.request.user  # Get the current user
        queryset = ItemInfo.objects.filter(user=user)  # Use the initial queryset

        # Get expirydate query parameters
        rangestart = self.request.query_params.get('rangestart')
        rangeend = self.request.query_params.get('rangeend')
        name = self.request.query_params.get('name')
        type = self.request.query_params.get('type')

        # Apply filtering based on query parameters
        if rangestart is not None:
            queryset = queryset.filter(expiry_date__gte=rangestart).order_by('expiry_date', 'name')
        if rangeend is not None:
            queryset = queryset.filter(expiry_date__lte=rangeend).order_by('expiry_date', 'name')
        if name is not None:
            queryset = queryset.filter(name=name).order_by('expiry_date', 'name')
        if type is not None:
            queryset = queryset.filter(type=type).order_by('expiry_date', 'name')

        return queryset

class ItemInfoViewSetCount(viewsets.ModelViewSet):
    serializer_class = ItemInfoSerializer
    queryset = ItemInfo.objects.all()  # Initial queryset

    # logger.debug(queryset.count())

    def list(self, request, *args, **kwargs):
        if self.request.user.is_authenticated is None:
            return Response({'error': "User Not Logged In."}, status=500)
        user = self.request.user
        queryset = ItemInfo.objects.filter(user=user)  # Use the initial queryset
        rangestart = self.request.query_params.get('rangestart')
        rangeend = self.request.query_params.get('rangeend')
        name = self.request.query_params.get('name')
        type = self.request.query_params.get('type')

        # Define a Q object to combine multiple filter conditions
        filter_conditions = Q()

        if rangestart is not None:
            filter_conditions &= Q(expiry_date__gte=rangestart)
        if rangeend is not None:
            filter_conditions &= Q(expiry_date__lte=rangeend)
        if name is not None:
            filter_conditions &= Q(name=name)
        if type is not None:
            filter_conditions &= Q(type=type)

        # Apply filtering based on query parameters and count the results
        count = queryset.filter(filter_conditions).count()

        return Response({"count": count})


class ItemInfoViewSetByType(viewsets.ModelViewSet):
    serializer_class = ItemInfoSerializerByType
    queryset = ItemInfo.objects.all()

    def get_queryset(self):
        if self.request.user.is_authenticated is None:
            return Response({'error': "User Not Logged In."}, status=500)
        user = self.request.user
        queryset = ItemInfo.objects.filter(user=user)  # Use the initial queryset

        return queryset


class ItemInfoViewSetByName(viewsets.ModelViewSet):
    serializer_class = ItemInfoSerializerByName
    queryset = ItemInfo.objects.all()

    def get_queryset(self):
        if self.request.user.is_authenticated is None:
            return Response({'error': "User Not Logged In."}, status=500)
        user = self.request.user
        queryset = ItemInfo.objects.filter(user=user)  # Use the initial queryset

        return queryset

