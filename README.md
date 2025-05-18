# ✅ Todo Application

A full-stack todo application built with Django, PostgreSQL, and Angular that helps users manage their tasks efficiently.

**Live Demo:** [https://todoappclient.web.app/](https://todoappclient.web.app/) 🌐

## 📋 Project Overview

This Todo Application is a comprehensive task management system that allows users to create, track, and manage their todos. Built with a modern tech stack including Django REST Framework backend and Angular frontend, it provides a seamless user experience with responsive design.

### 🔔 What's New

We’ve added several new features to enhance usability and security:

- 📧 **Email Confirmation**: Users must confirm their email during registration.
- 🔑 **Forgot Password & Reset Flow**: Easily recover access with a secure password reset process.
- 📆 **Internal Calendar View**: Users can now visualize their todo deadlines directly within the app interface.

## ✨ Features

- 🔐 User registration and login with JWT authentication
- 📩 Email verification during registration
- 🔁 Forgot password and secure password reset flow
- 📋 CRUD operations on personal todos
- ⏰ Todo items include:
  - Title
  - Description
  - Status (e.g., pending, completed)
  - Deadline
- 📅 View tasks in a built-in calendar component
- 🌐 Optional integration with Google Calendar
- 👤 Todos are securely scoped to individual users

## 🛠️ Tech Stack

### Backend
- Python 3.13 🐍
- Django & Django REST Framework 🎯
- PostgreSQL 🐘
- JWT Authentication 🔑
- Email Services (e.g., SendGrid or SMTP) 📬

### Frontend
- Angular 14+ 🅰️
- TypeScript 📜
- RxJS ⚡
- Angular Material 🎨
- FullCalendar for internal calendar integration 📆

### Infrastructure
- Firebase Hosting (Frontend) 🔥
- Render Hosting (Backend and Database) 🥵
- Google Calendar API integration 📅
- RESTful API architecture 🌐

## 🔄 Authentication Flow

1. **Registration**: Users register with email and password
2. **Email Confirmation**: A verification email is sent; the user must confirm before logging in
3. **Login**: Users receive a JWT token upon successful login
4. **Forgot Password**: Users can request a password reset email
5. **Reset Password**: Reset link allows user to securely update their password

## 👨‍💻 Contributors

This project was developed as student work for the Introduction to Software Engineering course by:

- Vladyslav Kovtun
- Oleh Kyshko
- Atai Sultangaziev
- Mykyta Kravchenko

## 📄 License

This project is not licensed yet 😤.

---

*This README was last updated on May 18, 2025* 📆
