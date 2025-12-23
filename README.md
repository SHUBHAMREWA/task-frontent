# Student Dashboard Frontend

A modern, beautiful React frontend built with Vite, Tailwind CSS, and React Router for the Student Management System.

## 🎨 Features

- ✅ **Modern UI Design** - Glassmorphism effects, gradient backgrounds, smooth animations
- ✅ **Authentication** - Login and Signup pages with form validation
- ✅ **Role-Based Access** - Separate dashboards for Admin and Student roles
- ✅ **Protected Routes** - Route guards based on authentication and user roles
- ✅ **State Management** - Context API for global authentication state
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **CRUD Operations** - Full student management for admins
- ✅ **Profile Management** - Students can view and edit their profiles

## 📁 Folder Structure

```
src/
├── assets/          # Images, icons
├── components/      # Reusable components
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── Loader.jsx
├── pages/           # Page components
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── AdminDashboard.jsx
│   └── StudentDashboard.jsx
├── routes/          # App routing
│   └── AppRoutes.jsx
├── context/         # Global state management
│   └── AuthContext.jsx
├── services/        # API calls
│   └── api.js
├── hooks/           # Custom hooks
│   └── useAuth.js
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API URL:**
   - Open `src/services/api.js`
   - Update `API_URL` if your backend is running on a different port:
     ```javascript
     const API_URL = 'http://localhost:5000/api';
     ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:5173`

## 🎯 Usage

### For Students:
1. Sign up with role "Student"
2. Fill in your course information
3. Access your dashboard to view and edit your profile

### For Admins:
1. Sign up with role "Admin"
2. Access admin dashboard
3. View all students in a table
4. Add, edit, or delete student records

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management
- **Fetch API** - HTTP requests

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Features

### Glassmorphism Cards
Beautiful frosted glass effect with backdrop blur

### Gradient Backgrounds
Vibrant, eye-catching gradient combinations:
- Login: Purple → Pink
- Signup: Blue → Teal → Green
- Dashboards: Purple → Indigo

### Animated Blobs
Smooth, floating blob animations in the background

### Micro-interactions
- Hover effects on buttons and links
- Scale transforms on interactive elements
- Smooth transitions throughout

## 🔐 Authentication Flow

1. User logs in or signs up
2. JWT token and user data stored in localStorage
3. AuthContext provides user state globally
4. ProtectedRoute checks authentication and role
5. Redirects to appropriate dashboard based on role

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Responsive navigation
- Adaptive layouts for all screen sizes

## 🔧 API Integration

All API calls are centralized in `src/services/api.js`:

- `login(credentials)` - User login
- `signup(userData)` - User registration
- `getAllStudents()` - Get all students (Admin only)
- `getStudentProfile()` - Get current student profile
- `createStudent(data)` - Create new student (Admin only)
- `updateStudent(id, data)` - Update student (Admin only)
- `updateStudentProfile(data)` - Update own profile (Student)
- `deleteStudent(id)` - Delete student (Admin only)

## 🎯 Future Enhancements

- [ ] Pagination for student list
- [ ] Search and filter functionality
- [ ] Email verification
- [ ] Password reset
- [ ] Change password feature
- [ ] Dark mode toggle
- [ ] Export student data
- [ ] Bulk operations

## 📄 License

This project is part of a MERN stack internship assignment.

## 👨‍💻 Author

Built with ❤️ for the MERN Stack Internship Assignment
