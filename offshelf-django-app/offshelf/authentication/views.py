import json
import os
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.permissions import AllowAny
from offshelf.authentication.serializers import UserSerializer, ForgetPasswordSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.conf import settings

User = get_user_model()


class UserRegistrationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            with open(os.path.join(os.getcwd(), "token_file.json"), "w") as token_file:
                print(os.path.join(os.getcwd(), "token_file.json"))
                token_file.write(json.dumps({'token': token.key, 'user_id': user.id, 'username': user.username}))

            return Response({'token': token.key, 'user_id': user.id, 'username': user.username},
                            status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        request.auth.delete()
        with open(os.path.join(os.getcwd(), "token_file.json"), "w") as token_file:
            token_file.write(json.dumps({}))
        logout(request)
        return JsonResponse({'message': 'User logged out successfully.'})


# class ForgetPasswordView(APIView):
#     def post(self, request):
#         serializer = ForgetPasswordSerializer(data=request.data)
#
#         if serializer.is_valid():
#             email = serializer.validated_data.get('email')
#
#             try:
#                 user = User.objects.get(email=email)
#             except User.DoesNotExist:
#                 return Response({'error': 'User not found with this email'}, status=status.HTTP_400_BAD_REQUEST)
#
#             # Generate a unique token (e.g., UUID) and save it to the user's model
#             user.reset_password_token = 'generated_token_here'
#             user.save()
#
#             # Send a password reset link to the user's email
#             reset_link = f'{settings.FRONTEND_URL}/reset-password/{user.reset_password_token}/'
#             send_mail(
#                 'Password Reset',
#                 f'Click the following link to reset your password: {reset_link}',
#                 'donotreply@offshelf.com',
#                 [email],
#                 fail_silently=False,
#             )
#
#             return Response({'message': 'Password reset link sent to your email'}, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
