from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_str, force_bytes
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .models import User, Hotel
from .serializers import UsersSerializer, HotelSerializer, UserLoginSerializer


class UsersViewSet(viewsets.ModelViewSet):
    """ViewSet for full CRUD on User model (requires authentication)"""

    queryset = User.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [IsAuthenticated]


class HotelViewSet(viewsets.ModelViewSet):
    """ViewSet for full CRUD on Hotel model (requires authentication)"""

    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]


class UserListCreateView(generics.ListCreateAPIView):
    """List and create users (registration is open to anyone)"""

    queryset = User.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [AllowAny]


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a user (requires authentication)"""

    queryset = User.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [IsAuthenticated]
    
class HotelListCreateView(generics.ListCreateAPIView):
    """List and create hotels (requires authentication)"""

    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Hotel.objects.filter(user=self.request.user)
class HotelRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a hotel (requires authentication)"""

    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Hotel.objects.filter(user=self.request.user)
class UserLoginView(APIView):
    """Handle user login (open to anyone)"""

    permission_classes = [AllowAny]

    def post(self, request):
        """POST: Authenticate and log in a user"""
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            try:
                user_obj = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            user = authenticate(request, username=user_obj.username, password=password)

            if user is not None:
                login(request, user)
                return Response(
                    {"message": "Login successful"}, status=status.HTTP_200_OK
                )
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    """Handle user logout (requires authentication)"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request)
        """POST: Log out the current user"""
        try:
            logout(request)
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )


class AuthCheckView(APIView):
    """
    Checks if the user is authenticated.
    Returns 200 OK if authenticated, 401 Unauthorized otherwise.
    """
    permission_classes = [AllowAny]  # anyone can hit it

    def get(self, request):
        if request.user.is_authenticated:
            return Response(
                {"authenticated": True, "username": request.user.username},
                status=status.HTTP_200_OK
            )
        return Response(
            {"authenticated": False},
            status=status.HTTP_401_UNAUTHORIZED
        )


class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'If an account with that email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)

        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)

        # Build the reset URL for the Next.js frontend
        # This URL must match your Next.js route
        
        reset_url = f"https://red-product-lyart.vercel.app/forgot/reset/{uid}/{token}"

        email_body = f'Hi {user.username}, please use the link below to reset your password:\n{reset_url}'
        email = EmailMessage(
            'Password Reset Request',
            email_body,
            'noreply@yourdomain.com',
            [user.email],
        )
        email.send()

        return Response({'message': 'Un lien vous a été envoyé par mail'}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        
        try:
            # Decode the UID to get the user ID
            uid_decoded = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid_decoded)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the token is valid for the user
        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, token):
            return Response({'error': 'The reset link is invalid or has expired.'}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
