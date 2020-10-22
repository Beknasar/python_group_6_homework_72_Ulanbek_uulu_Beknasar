from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuoteViewSet


router = DefaultRouter()
router.register('quote', QuoteViewSet)


app_name = 'api'


urlpatterns = [
    path('', include(router.urls))
]
