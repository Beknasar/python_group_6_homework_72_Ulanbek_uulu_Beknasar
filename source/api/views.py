from django.http import HttpResponseNotAllowed, HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.viewsets import ModelViewSet

from api.serializers import QuoteCreateSerializer, QuoteUpdateSerializer, QuoteSerializer, QuoteViewSerializer
from webapp.models import Quote
from .permissions import QuotePermissions


# @ensure_csrf_cookie
# def get_token_view(request, *args, **kwargs):
#     if request.method == 'GET':
#         return HttpResponse()
#     return HttpResponseNotAllowed('Only GET request are allowed')


class QuoteViewSet(ModelViewSet):
    permission_classes = [QuotePermissions]

    def get_queryset(self):
        if self.request.method == 'GET' and \
                not self.request.user.has_perm('webapp.quote_view'):
            return Quote.get_moderated()
        return Quote.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return QuoteCreateSerializer
        elif self.request.method == 'PUT':
            return QuoteUpdateSerializer
        return QuoteSerializer
