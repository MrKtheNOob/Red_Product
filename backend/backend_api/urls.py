from django.urls import path
from backend_api.views import (
    PasswordResetConfirmView,
    PasswordResetRequestView,
    UserListCreateView,
    UserRetrieveUpdateDestroyView,
    HotelListCreateView,
    HotelRetrieveUpdateDestroyView,
    UserLoginView,
    UserLogoutView,
    AuthCheckView
    )

urlpatterns = [
    path("users/", UserListCreateView.as_view(), name="user-list-create"),
    path("users/<int:pk>/", UserRetrieveUpdateDestroyView.as_view(), name="user-detail"),
    path("hotels/", HotelListCreateView.as_view(), name="hotel-list-create"),
    path("hotels/<int:pk>/", HotelRetrieveUpdateDestroyView.as_view(), name="hotel-detail"),
    path("login/", UserLoginView.as_view(), name="user-login"),
    path("logout/", UserLogoutView.as_view(), name="user-logout"),
    path("auth-check/", AuthCheckView.as_view(), name="auth-check"),
    path('password-reset/request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]