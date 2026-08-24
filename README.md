# AMISPHERE - Academic Management System

A modern, role-based academic management web application built with React, Vite, and Tailwind CSS.

![AMISPHERE Banner](https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200)

## 🌟 Features

### Role-Based Dashboards

**Student Portal:**
- 📊 Dashboard with academic stats (Attendance, Fees, CGPA)
- 📅 Subject-wise attendance tracking with visualizations
- 💰 Fee management and payment history
- 📚 Course enrollment and schedule
- 📝 Exam schedule and results
- 🎫 Support request system

**Teacher Portal:**
- 📈 Dashboard with teaching metrics
- ✅ Student request management (Approve/Reject/Escalate)
- 👥 Class management
- 📋 Today's schedule overview

**HOD Portal:**
- 📊 Department-wide statistics and metrics
- ✔️ Final approval for escalated requests
- 📈 Department performance analytics
- 👨‍🏫 Faculty and student overview

### Modern UI/UX
- 🎨 Clean, institutional-grade design
- 📱 Fully responsive (Mobile, Tablet, Desktop)
- 🌓 Modern glassmorphism and shadow effects
- 📊 Interactive data visualizations (Recharts)
- ⚡ Smooth animations with Framer Motion

## 🛠️ Tech Stack

- **Framework:** React 18.3 with Vite 6.0
- **Styling:** Tailwind CSS 3.x with custom theme
- **Routing:** React Router DOM 7.x
- **UI Components:** Custom component library (Card, Button, Badge, Modal, Table)
- **Charts:** Recharts for data visualization
- **Icons:** React Icons (FontAwesome)
- **Animations:** Framer Motion
- **Date Formatting:** date-fns
- **State Management:** React Context API

## 📦 Installation

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x

### Setup

1. **Clone the repository**
```bash
cd d:/Amisphere
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will run at `http://localhost:5173`

## 🔐 Demo Credentials

### Student
- **ID:** DIP2024STU001
- **Password:** 123

### Teacher
- **ID:** FAC001
- **Password:** 123

### HOD
- **ID:** HOD001
- **Password:** 123

## 📁 Project Structure

```
d:/Amisphere/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── StatCard.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   └── EmptyState.jsx
│   ├── pages/              # Page components
│   │   ├── student/        # Student dashboard pages
│   │   ├── teacher/        # Teacher dashboard pages
│   │   ├── hod/            # HOD dashboard pages
│   │   └── LoginPage.jsx
│   ├── layouts/            # Layout components
│   │   └── DashboardLayout.jsx
│   ├── context/            # React Context for state
│   │   ├── AuthContext.jsx
│   │   └── DataContext.jsx
│   ├── lib/                # Utility functions
│   │   └── utils.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles with Tailwind
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🎨 Design System

### Colors
- **Primary:** Blue shades (#3b82f6 - #172554)
- **Secondary:** Orange shades (#f97316 - #431407)
- **Accent:** Green shades (#10b981 - #022c22)
- **Neutral:** Gray shades (#f9fafb - #030712)

### Typography
- **Headings:** Plus Jakarta Sans
- **Body:** Inter

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📊 Features Breakdown

### Request Workflow
1. **Student** raises a request (Attendance, Leave, etc.)
2. **Teacher** reviews and:
   - Approves directly
   - Rejects with reason
   - Escalates to HOD for complex cases
3. **HOD** provides final approval/rejection for escalated requests

### Authentication
- Role-based access control
- Session persistence with localStorage
- Protected routes for each role
- Automatic role-based redirection

### Data Visualization
- Pie charts for attendance distribution
- Progress bars for fee payment
- Line charts for department trends (extensible)
- Stat cards with trend indicators

## 🔧 Firebase Integration (Ready)

The app is structured for easy Firebase integration:

1. Create `src/config/firebase.config.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

2. Replace mock data in `DataContext.jsx` with Firestore queries
3. Update `AuthContext.jsx` to use Firebase Authentication

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🏗️ Production Build

```bash
npm run build
```

Build output will be in the `dist/` directory.

## 📄 License

This project is for academic purposes.

## 👨‍💻 Developer

Built with ❤️ for Amisphere University

---

## 🎯 Key Highlights

✅ **Production-Quality Code** - Clean, maintainable, documented  
✅ **Modern UI/UX** - Institutional-grade design  
✅ **Fully Responsive** - Works on all devices  
✅ **Role-Based Access** - Secure role separation  
✅ **Scalable Architecture** - Easy to extend  
✅ **Firebase-Ready** - Structured for real backend  
✅ **Data Visualization** - Charts and graphs  
✅ **Request Workflow** - Complete approval chain  

**Ready for academic submission and real-world deployment!** 🚀
