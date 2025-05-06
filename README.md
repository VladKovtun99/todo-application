# ✅ Todo Application

A full-stack todo application built with Django, PostgreSQL, and Angular that helps users manage their tasks efficiently.

**Live Demo:** [https://todoappclient.web.app/](https://todoappclient.web.app/) 🌐

## 📋 Project Overview

This Todo Application is a comprehensive task management system that allows users to create, track, and manage their todos. Built with a modern tech stack including Django REST Framework backend and Angular frontend, it provides a seamless user experience with responsive design.

## ✨ Features

- 🔐 User registration and login with JWT authentication
- 📋 CRUD operations on personal todos
- ⏰ Todo items include:
  - Title
  - Description
  - Status (e.g., pending, completed)
  - Deadline
- 📅 Optional integration with **Google Calendar**
- 👤 Todos are securely scoped to individual users

## 🛠️ Tech Stack

### Backend
- Python 3.x 🐍
- Django & Django REST Framework 🎯
- PostgreSQL 🐘
- JWT Authentication 🔑

### Frontend
- Angular 14+ 🅰️
- TypeScript 📜
- RxJS ⚡
- Angular Material 🎨

### Infrastructure
- Firebase Hosting (Frontend) 🔥
- Render Hosting (Backend and Database) 🥵
- Google Calendar API integration 📅
- RESTful API architecture 🌐

## 🔄 Authentication Flow

1. **Registration**: Users register with email and password
2. **Login**: Users receive a JWT token upon successful login
3. **Request Authorization**: All API requests include the JWT token in the Authorization header
4. **Token Refresh**: Tokens are refreshed automatically when expired

## 👨‍💻 Contributors

This project was developed as student work for the Introduction to Software Engineering course by:

- Vladyslav Kovtun
- Oleh Kyshko
- Atai Sultangaziev
- Mykyta Kravchenko

## 📄 License

This project is not licensed yet 😤.

---

*This README was last updated on May 5, 2025* 📆
