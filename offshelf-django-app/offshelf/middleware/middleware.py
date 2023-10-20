import json

from django.shortcuts import redirect
import os
import logging

class RerouteMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        logger = logging.getLogger(__name__)
        # logger.debug(request.user.is_authenticated)
        # logger.debug(request)
        # if not request.user.is_authenticated:
        #     if not (request.path.startswith('/login') or request.path.startswith('/register')):
        #         # Check if the current path doesn't start with '/login'
        #         return redirect('/login/')
        return self.get_response(request)
