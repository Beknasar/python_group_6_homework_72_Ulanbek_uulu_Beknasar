from django.shortcuts import render

# Create your views here.
from django.views.generic import ListView

from webapp.models import Quote


class IndexView(ListView):
    # form_class = Hei
    template_name = 'index.html'

    def get_queryset(self):
        return Quote.objects.all()