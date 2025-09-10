from django.urls import path
from backend_api.views import hello_world, UserListCreateView, UserRetrieveUpdateDestroyView, HotelListCreateView, HotelRetrieveUpdateDestroyView, UserLoginView, UserLogoutView, AuthCheckView

urlpatterns = [
    path("hello/", hello_world),
    path("users/", UserListCreateView.as_view(), name="user-list-create"),
    path("users/<int:pk>/", UserRetrieveUpdateDestroyView.as_view(), name="user-detail"),
    path("hotels/", HotelListCreateView.as_view(), name="hotel-list-create"),
    path("hotels/<int:pk>/", HotelRetrieveUpdateDestroyView.as_view(), name="hotel-detail"),
    path("login/", UserLoginView.as_view(), name="user-login"),
    path("logout/", UserLogoutView.as_view(), name="user-logout"),
    path("auth-check/", AuthCheckView.as_view(), name="auth-check"),
]