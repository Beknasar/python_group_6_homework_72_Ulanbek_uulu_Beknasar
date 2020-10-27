from django.http import HttpResponse, HttpResponseNotAllowed
from django.shortcuts import render, render_to_response

# Create your views here.
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import View

from webapp.models import Quote


@ensure_csrf_cookie
def get_token_view(request, *args, **kwargs):
    if request.method == 'GET':
        return HttpResponse()
    return HttpResponseNotAllowed('Only GET request are allowed')


class IndexView(View):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request, *args, **kwargs):
        return render_to_response('index.html')