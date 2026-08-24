import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentFees from './pages/student/StudentFees';
import StudentCourses from './pages/student/StudentCourses';
import StudentExams from './pages/student/StudentExams';
import StudentSupport from './pages/student/StudentSupport';
import StudentProfile from './pages/student/StudentProfile';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherProfile from './pages/teacher/TeacherProfile';

import TeacherRequests from './pages/teacher/TeacherRequests';
import TeacherLayout from './pages/teacher/TeacherLayout';
import TeacherTimetable from './pages/teacher/TeacherTimetable';
import TeacherNotes from './pages/teacher/TeacherNotes';
import TeacherNotices from './pages/teacher/TeacherNotices';
import TeacherClassDetail from './pages/teacher/TeacherClassDetail';
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherCalendar from './pages/teacher/TeacherCalendar';
import HODDashboard from './pages/hod/HODDashboard';
import HODTeachers from './pages/hod/HODTeachers';
import HODApprovals from './pages/hod/HODApprovals';
import HODProfile from './pages/hod/HODProfile';
import { FaHome, FaCalendarCheck, FaMoneyBillWave, FaBook, FaEdit, FaHeadset, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

// Placeholder Pages for sections not fully implemented yet
const Page = ({ title }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-500">This module is part of the expanded scope.</p>
    </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/" />;
    if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;
    return children;
};

// Menu Configs
const MENUS = {
    student: [
        { path: '/student', label: 'Dashboard', icon: <FaHome /> },
        { path: '/student/attendance', label: 'Attendance', icon: <FaCalendarCheck /> },
        { path: '/student/fees', label: 'Fees', icon: <FaMoneyBillWave /> },
        { path: '/student/courses', label: 'Courses', icon: <FaBook /> },
        { path: '/student/exams', label: 'Exams', icon: <FaEdit /> },
        { path: '/student/support', label: 'Support & Request', icon: <FaHeadset /> },
    ],
    teacher: [
        { path: '/teacher', label: 'Dashboard', icon: <FaHome /> },
        { path: '/teacher/requests', label: 'Student Requests', icon: <FaHeadset /> },
        { path: '/teacher/classes', label: 'My Classes', icon: <FaChalkboardTeacher /> },
    ],
    hod: [
        { path: '/hod', label: 'Dashboard', icon: <FaHome /> },
        { path: '/hod/teachers', label: 'Teachers', icon: <FaUsers /> },
        { path: '/hod/approvals', label: 'Approvals', icon: <FaCalendarCheck /> },
        { path: '/hod/reports', label: 'Reports', icon: <FaBook /> },
    ]
};

const App = () => {
    return (
        <DataProvider>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />

                    {/* Student Routes */}
                    <Route path="/student" element={
                        <ProtectedRoute allowedRole="student">
                            <DashboardLayout menuItems={MENUS.student} />
                        </ProtectedRoute>
                    }>
                        <Route index element={<StudentDashboard />} />
                        <Route path="attendance" element={<StudentAttendance />} />
                        <Route path="fees" element={<StudentFees />} />
                        <Route path="courses" element={<StudentCourses />} />
                        <Route path="exams" element={<StudentExams />} />
                        <Route path="support" element={<StudentSupport />} />
                        <Route path="profile" element={<StudentProfile />} />
                    </Route>

                    {/* Teacher Routes */}
                    <Route path="/teacher" element={
                        <ProtectedRoute allowedRole="teacher">
                            {/* Use dynamic TeacherLayout instead of static MENUS.teacher */}
                            <TeacherLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<TeacherDashboard />} />
                        <Route path="requests" element={<TeacherRequests />} />
                        <Route path="calendar" element={<TeacherCalendar />} />
                        <Route path="classes" element={<TeacherClasses />} />
                        <Route path="classes/:classId" element={<TeacherClassDetail />} />
                        <Route path="timetable" element={<TeacherTimetable />} />
                        <Route path="notes" element={<TeacherNotes />} />
                        <Route path="notices" element={<TeacherNotices />} />
                        <Route path="profile" element={<TeacherProfile />} />
                    </Route>

                    {/* HOD Routes */}
                    <Route path="/hod" element={
                        <ProtectedRoute allowedRole="hod">
                            <DashboardLayout menuItems={MENUS.hod} />
                        </ProtectedRoute>
                    }>
                        <Route index element={<HODDashboard />} />
                        <Route path="teachers" element={<HODTeachers />} />
                        <Route path="approvals" element={<HODApprovals />} />
                        <Route path="reports" element={<Page title="Reports" />} />
                        <Route path="profile" element={<HODProfile />} />
                    </Route>

                </Routes>
            </AuthProvider>
        </DataProvider>
    );
};

export default App;
