from django.test import TestCase
from django.urls import reverse
from .models import User, Hotel

class UsersModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            password='testpassword',
            email='testuser@example.com'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'testuser@example.com')

class HotelModelTest(TestCase):
    def setUp(self):
        self.hotel = Hotel.objects.create(
            name='Test Hotel',
            location='Test Location',
            rating=5
        )

    def test_hotel_creation(self):
        self.assertEqual(self.hotel.name, 'Test Hotel')
        self.assertEqual(self.hotel.rating, 5)

class UsersViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )

    def test_user_login(self):
        response = self.client.post(reverse('login'), {
            'username': 'testuser',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, 200)

class HotelViewTest(TestCase):
    def setUp(self):
        self.hotel = Hotel.objects.create(
            name='Test Hotel',
            location='Test Location',
            rating=5
        )

    def test_hotel_list(self):
        response = self.client.get(reverse('hotel-list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test Hotel')