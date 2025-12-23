# 🎓 Student Dashboard - Frontend

Welcome to the **Student Dashboard**! This is the user interface for our Student Management System. It's built to be beautiful, fast, and easy to use. We've used the latest tech like **React**, **Vite**, and **Tailwind CSS** to make sure it looks great on any device. 

## ✨ Key Features

We've packed this with features to make managing students a breeze:

*   **🎨 Stunning Design**: Glassmorphism cards, smooth animations, and beautiful gradients. It doesn't just work well; it looks great doing it.
*   **🔐 Secure Login**: Role-based access for Admins and Students. Your data is safe with us.
*   **👤 Admin Powers**: Admins have a full command center. Add, edit, or remove students with just a few clicks.
*   **📝 Student Profile**: Students can log in, view their details, and keep their profile up-to-date.
*   **📱 Mobile Friendly**: Whether you're on a laptop or a phone, the dashboard adjusts perfectly.
*   **🔑 Password Recovery**: Forgot your password? No problem! Request a reset link via email.

---

## 🚀 How to Get Started

Follow these simple steps to run this project on your machine:

### 1️⃣ Install Dependencies
Open your terminal in this folder and run:
```bash
npm install
```

### 2️⃣ Configure the Connection
We need to talk to the backend server. By default, it connects to our live server, but you can change it in `src/services/api.js` if you are running the backend locally.

### 3️⃣ Start the App!
Run this command to fire up the development server:
```bash
npm run dev
```

Click the link (usually `http://localhost:5173`) to open it in your browser.

---

## 🛠️ Tech Stack (The Geeky Stuff)

*   **⚡ Vite**: For super-fast development.
*   **⚛️ React**: The library that powers the UI.
*   **💅 Tailwind CSS**: For styling without the hassle.
*   **🛣️ React Router**: For smooth navigation between pages.
*   **🔒 Context API**: To manage your login session globally.

---

## 📖 User Guide

### 👨‍🏫 For Admins
*   **Login**: Use your admin credentials.
*   **Dashboard**: You'll be greeted with a "Welcome, [Name]" text.
*   **Manage**: Click **+ Add New Student** to enroll someone. Use the **Edit** or **Delete** buttons in the list to manage existing students.
*   **Profile**: Click **Edit My Profile** top right to change your name or password.

### 👨‍🎓 For Students
*   **Login**: Enter your email and password.
*   **Dashboard**: See your course details and status immediately.
*   **Update**: Click **Edit Profile** to change your name, email, or password.

---

## 🔮 What's Next?
We are constantly improving! Here is what we have added recently:
- [x] Password Reset via Email
- [x] Profile Picture placeholders
- [x] Secure "Change Password" settings
- [ ] Dark Mode Support (Coming Soon!)

---

Made with ❤️ by your friendly developer. Happy Coding! 🚀
