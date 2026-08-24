import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaBullhorn, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

/**
 * NotificationDropdown Component - Dark Theme
 * Shows latest notices and alerts with badge count
 */
const NotificationDropdown = ({ className = '' }) => {
    const { user } = useAuth();
    const { data } = useData();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get notifications based on role
    const getNotifications = () => {
        const notifications = [];

        if (user.role === 'student') {
            const studentData = data.studentData[user.id];
            if (studentData?.notifications) {
                notifications.push(...studentData.notifications);
            }
        } else if (user.role === 'teacher') {
            // Teacher gets notices they created and system notices
            if (data.notices) {
                const teacherNotices = data.notices
                    .filter(n => n.authorId === user.id)
                    .map(n => ({
                        id: n.id,
                        title: n.title,
                        message: n.content,
                        date: n.date,
                        type: 'info'
                    }));
                notifications.push(...teacherNotices.slice(0, 3));
            }
        } else if (user.role === 'hod') {
            // HOD gets approval requests and system notices
            if (data.hodRequests) {
                const requests = data.hodRequests
                    .filter(r => r.status === 'pending')
                    .map(r => ({
                        id: r.id,
                        title: 'New Request',
                        message: r.message,
                        date: r.date || new Date().toISOString(),
                        type: 'warning'
                    }));
                notifications.push(...requests.slice(0, 3));
            }
        }

        // Add general notices
        if (data.notices) {
            const generalNotices = data.notices
                .slice(0, 2)
                .map(n => ({
                    id: n.id,
                    title: n.title,
                    message: n.content,
                    date: n.date,
                    type: 'info'
                }));
            notifications.push(...generalNotices);
        }

        return notifications.slice(0, 5);
    };

    const notifications = getNotifications();
    const unreadCount = notifications.length;

    const getIcon = (type) => {
        switch (type) {
            case 'alert':
                return <FaExclamationTriangle className="text-danger" />;
            case 'warning':
                return <FaBell className="text-warning" />;
            default:
                return <FaInfoCircle className="text-accent-blue" />;
        }
    };

    const handleViewAll = () => {
        setIsOpen(false);
        if (user.role === 'teacher') {
            navigate('/teacher/notices');
        } else {
            // Navigate to appropriate notices page
            console.log('Navigate to notices');
        }
    };

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 bg-dark-800 rounded-xl hover:bg-dark-700 transition-colors group"
            >
                <FaBell className="text-text-secondary group-hover:text-accent-gold transition-colors" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 glass-card z-50 animate-slide-down">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-dark-700">
                        <h3 className="text-sm font-bold text-text-primary">Notifications</h3>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="px-4 py-3 hover:bg-dark-800 transition-colors border-b border-dark-700/50 cursor-pointer"
                                >
                                    <div className="flex gap-3">
                                        <div className="mt-1 text-lg flex-shrink-0">
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-text-primary mb-1">
                                                {notification.title}
                                            </h4>
                                            <p className="text-xs text-text-muted line-clamp-2 mb-2">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-text-muted">
                                                {format(new Date(notification.date), 'MMM dd, h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center">
                                <FaBell className="text-4xl text-text-muted mx-auto mb-3" />
                                <p className="text-sm text-text-muted">No new notifications</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t border-dark-700">
                            <button
                                onClick={handleViewAll}
                                className="w-full text-center text-sm font-semibold text-accent-gold hover:text-accent-gold-dark transition-colors"
                            >
                                View All Notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
