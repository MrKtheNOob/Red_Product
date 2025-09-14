# Red Product

## Description

Ce projet est un système de gestion hôtelière implémenté avec Django (pour le backend) et Next.js (pour le frontend). Il offre des fonctionnalités pour gérer les utilisateurs et les hôtels, y compris les opérations CRUD, l'authentification et la réinitialisation de mot de passe.

## Structure du Projet

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
├── frontend
│   ├── src
│   │   ├── app
│   │   │   ├── forgot/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot/
│   │   │   │   └── reset/
│   │   │   │       └── [uuid]/
│   │   │   │           └── [token]/
│   │   │   │               └── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── ...
└── README.md
```

## Instructions de Configuration

### 1\. Cloner le dépôt :

```bash
git clone [<repository-url>](https://github.com/MrKtheNOob/Red_Product.git)
cd project1
```

-----

### 2\. Lancer le Backend Django

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Sur Windows, utilisez `venv\Scripts\activate`
pip install django djangorestframework
python manage.py migrate
python manage.py runserver
```

  - L'API du backend sera disponible à l'adresse `http://127.0.0.1:8000/`.

-----

### 3\. Lancer le Frontend Next.js

```bash
cd ../frontend
npm install
npm run dev
```

  - Le frontend sera disponible à l'adresse `http://localhost:3000/`.

-----

## Utilisation

  - Accéder à l'API à l'adresse `http://127.0.0.1:8000/`.
  - Accéder au frontend à l'adresse `http://localhost:3000/`.

### Points d'Accès (API Endpoints)

#### Utilisateurs

  - **Créer un Utilisateur :** `POST /api/users/`
  - **Lister les Utilisateurs :** `GET /api/users/`
  - **Récupérer un Utilisateur :** `GET /api/users/<id>/`
  - **Mettre à Jour un Utilisateur :** `PUT /api/users/<id>/`
  - **Supprimer un Utilisateur :** `DELETE /api/users/<id>/`

#### Hôtels

  - **Créer un Hôtel :** `POST /api/hotels/`
  - **Lister les Hôtels :** `GET /api/hotels/`
  - **Récupérer un Hôtel :** `GET /api/hotels/<id>/`
  - **Mettre à Jour un Hôtel :** `PATCH /api/hotels/<id>/`
  - **Supprimer un Hôtel :** `DELETE /api/hotels/<id>/`

#### Authentification

  - **Connexion :** `POST /api/login/`
  - **Déconnexion :** `POST /api/logout/`
  - **Vérification d'Authentification :** `GET /api/auth-check/`
  - **Obtenir un Jeton CSRF :** `GET /api/csrf-token/`

#### Réinitialisation de Mot de Passe

  - **Demande de Réinitialisation :** `POST /api/password-reset/request/`
  - **Confirmation de Réinitialisation :** `POST /api/password-reset/confirm/`
      - Charge utile : `{ "uid": "<uid>", "token": "<token>", "new_password": "<new_password>" }`
  - Le chemin du frontend `forgot/reset/[uuid]/[token]/` doit exister et envoyer une requête POST à `/api/password-reset/confirm/`.

-----

## Authentification

  - L'authentification des utilisateurs est mise en œuvre à l'aide du système d'authentification de Django.
  - Utilisez l'authentification basée sur les sessions ou les jetons pour l'accès à l'API.

-----
