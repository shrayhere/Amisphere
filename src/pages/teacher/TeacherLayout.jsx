import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
    FaHome, FaCalendarAlt, FaStickyNote, FaBullhorn,
    FaInbox, FaChalkboardTeacher
} from 'react-icons/fa';

const TeacherLayout = () => {
    // Strict Sidebar Requirements:
    // Calendar, Classes, Timetable, Notes, Notices

    // We keep Dashboard as home, and Requests as extra if needed, 
    // but user emphasized the specific list. 
    // Let's ensure those 5 are prominent.

    const menuItems = [
        { path: '/teacher', label: 'Dashboard', icon: <FaHome /> },
        { path: '/teacher/calendar', label: 'Calendar', icon: <FaCalendarAlt /> },
        { path: '/teacher/classes', label: 'Classes', icon: <FaChalkboardTeacher /> },
        { path: '/teacher/timetable', label: 'Timetable', icon: <FaCalendarAlt /> },
        { path: '/teacher/notes', label: 'Notes', icon: <FaStickyNote /> },
        { path: '/teacher/notices', label: 'Notices', icon: <FaBullhorn /> },
        { path: '/teacher/requests', label: 'Requests', icon: <FaInbox /> },
    ];

    return <DashboardLayout menuItems={menuItems} />;
};

export default TeacherLayout;
