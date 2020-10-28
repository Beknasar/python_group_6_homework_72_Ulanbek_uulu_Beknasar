from django.urls import path, include
from webapp.views import IndexView, QuoteVoteView, QuoteUnVoteView

app_name = 'webapp'


urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('quotes/', include([
        path('<int:pk>/', include([
            path('vote/', QuoteVoteView.as_view(), name='vote'),
            path('unvote/', QuoteUnVoteView.as_view(), name='unvote')
        ]))
    ])),
]
