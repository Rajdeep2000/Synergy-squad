from django.urls import path, include
from .views import AudioViewSet, ImageViewSet, ItemInfoViewSet, ItemInfoViewSetExpiryRange, ItemInfoViewSetCount, \
    ItemInfoViewSetByType, ItemInfoViewSetByName
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'audio', AudioViewSet)
router.register(r'image', ImageViewSet)
router.register(r'item', ItemInfoViewSet)
router.register(r'item/list/info', ItemInfoViewSetExpiryRange)
router.register(r'item/list/count', ItemInfoViewSetCount)
router.register(r'item/list/types', ItemInfoViewSetByType)
router.register(r'item/list/names', ItemInfoViewSetByName)


urlpatterns = [
    path('', include(router.urls)),
]

