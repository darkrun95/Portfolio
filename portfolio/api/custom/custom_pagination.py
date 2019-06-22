from rest_framework.pagination import PageNumberPagination
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework import status

class CustomPagination(PageNumberPagination, ListModelMixin):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 20

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'results': data,
        }, status=status.HTTP_200_OK)