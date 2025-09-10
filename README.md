# Project Title: Hotel Management System

## Description
This project is a Hotel Management System built using Django. It provides functionalities for managing users and hotels, including CRUD operations and authentication routes.

## Project Structure
```
project1
├── backend
│   ├── backend
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── backend_api
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations
│   │   │   └── __init__.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── db.sqlite3
│   └── manage.py
└── README.md
```

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd project1
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install django
   ```

4. **Run migrations:**
   ```
   python manage.py migrate
   ```

5. **Run the development server:**
   ```
   python manage.py runserver
   ```

## Usage
- Access the API at `http://127.0.0.1:8000/`.
- Use the following endpoints for CRUD operations:
  - **Users:**
    - Create User: `POST /api/users/`
    - Retrieve Users: `GET /api/users/`
    - Update User: `PUT /api/users/<id>/`
    - Delete User: `DELETE /api/users/<id>/`
  - **Hotels:**
    - Create Hotel: `POST /api/hotels/`
    - Retrieve Hotels: `GET /api/hotels/`
    - Update Hotel: `PUT /api/hotels/<id>/`
    - Delete Hotel: `DELETE /api/hotels/<id>/`

## Authentication
- Implement user authentication using Django's built-in authentication system.
- Use token-based authentication for API access.

## Testing
- Run tests using:
  ```
  python manage.py test
  ```

## License
This project is licensed under the MIT License - see the LICENSE file for details.