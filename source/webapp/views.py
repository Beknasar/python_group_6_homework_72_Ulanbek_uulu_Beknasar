from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseForbidden
from django.shortcuts import render, render_to_response, get_object_or_404

# Create your views here.
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import View

from webapp.models import Quote, Vote


@ensure_csrf_cookie
def get_token_view(request, *args, **kwargs):
    if request.method == 'GET':
        return HttpResponse()
    return HttpResponseNotAllowed('Only GET request are allowed')


class IndexView(View):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request, *args, **kwargs):
        return render_to_response('index.html')


class QuoteVoteView(View):
    def post(self, request, *args, **kwargs):
        quote = get_object_or_404(Quote, pk=kwargs.get('pk'))
        vote, created = Vote.objects.get_or_create(quote=quote, session_key=request.session.session_key)
        if created:
            vote.rating = 1
            vote.save()
            quote.vote_rating()
            return HttpResponse(quote.rating)
        else:
            return HttpResponseForbidden()


class QuoteUnVoteView(View):
    def post(self, request, *args, **kwargs):
        quote = get_object_or_404(Quote, pk=kwargs.get('pk'))
        vote, created = Vote.objects.get_or_create(quote=quote, session_key=request.session.session_key)
        if created:
            vote.rating = -1
            vote.save()
            quote.vote_rating()
            return HttpResponse(quote.rating)
        else:
            return HttpResponseForbidden()