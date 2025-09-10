from django.http import JsonResponse
from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
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

    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]


class HotelRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a hotel (requires authentication)"""

    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]


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

    # permission_classes = [IsAuthenticated]

    def post(self, request):
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


def hello_world(request):
    """Simple hello world endpoint for testing"""
    return JsonResponse({"message": "Hello, World!"})
