import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * ProfileDropdown Component - Dark Theme
 * Profile menu with view profile, settings, and logout
 */
const ProfileDropdown = ({ className = '' }) => {
    const { user, logout } = useAuth();
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

    const handleViewProfile = () => {
        setIsOpen(false);
        navigate(`/${user.role}/profile`);
    };

    const handleSettings = () => {
        setIsOpen(false);
        // Navigate to settings page (future feature)
        console.log('Navigate to settings');
    };

    const handleLogout = () => {
        setIsOpen(false);
        logout();
        navigate('/');
    };

    const getRoleBadgeColor = () => {
        switch (user.role) {
            case 'student':
                return 'bg-accent-blue/20 text-accent-blue';
            case 'teacher':
                return 'bg-success/20 text-success';
            case 'hod':
                return 'bg-accent-gold/20 text-accent-gold';
            default:
                return 'bg-dark-700 text-text-muted';
        }
    };

    const getRoleLabel = () => {
        switch (user.role) {
            case 'student':
                return 'Student';
            case 'teacher':
                return 'Faculty';
            case 'hod':
                return 'HOD';
            default:
                return user.role;
        }
    };

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 bg-dark-800 rounded-xl hover:bg-dark-700 transition-colors group"
            >
                <FaUserCircle className="text-xl text-text-secondary group-hover:text-accent-gold transition-colors" />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 glass-card z-50 animate-slide-down">
                    {/* User Info Header */}
                    <div className="px-4 py-4 border-b border-dark-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0">
                                <FaUser className="text-dark-900 text-lg" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-text-primary truncate">
                                    {user.name}
                                </h3>
                                <p className="text-xs text-text-muted truncate">{user.id}</p>
                            </div>
                        </div>
                        <div className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${getRoleBadgeColor()}`}>
                            {getRoleLabel()}
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <button
                            onClick={handleViewProfile}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-dark-800 transition-colors text-left"
                        >
                            <FaUser className="text-text-muted" />
                            <span className="text-sm text-text-primary font-medium">View Profile</span>
                        </button>

                        <button
                            onClick={handleSettings}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-dark-800 transition-colors text-left"
                        >
                            <FaCog className="text-text-muted" />
                            <span className="text-sm text-text-primary font-medium">Settings</span>
                        </button>
                    </div>

                    {/* Logout */}
                    <div className="py-2 border-t border-dark-700">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-danger/10 transition-colors text-left group"
                        >
                            <FaSignOutAlt className="text-text-muted group-hover:text-danger transition-colors" />
                            <span className="text-sm text-text-primary font-medium group-hover:text-danger transition-colors">
                                Logout
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
