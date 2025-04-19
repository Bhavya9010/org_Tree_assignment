# Organizational Tree Assessment

This project is a full-stack web application built using Django (Backend) and ReactJS (Frontend) to manage an organizational tree structure.

## Features
- List the org tree
- Add, Edit, Delete person
- View person details

## Tech Stack
- Backend: Django, Django REST Framework
- Frontend: React, Axios

## Setup Instructions

### Backend
```bash
cd backend
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
