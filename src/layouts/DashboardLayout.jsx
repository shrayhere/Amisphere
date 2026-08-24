
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaUniversity } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import NotificationDropdown from '../components/NotificationDropdown';
import ProfileDropdown from '../components/ProfileDropdown';

const DashboardLayout = ({ menuItems }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Vertical Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-72 bg-dark-900 border-r border-dark-800 z-30">
                {/* Logo Section */}
                <div className="p-6 border-b border-dark-800">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center shadow-glow-gold">
                            <FaUniversity className="text-xl text-dark-900" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold font-heading gradient-text-gold">AMISPHERE</h1>
                            <p className="text-xs text-text-muted mt-0.5">Academic Portal</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth relative group ${isActive
                                    ? 'bg-dark-800/80 text-accent-gold active-strip'
                                    : 'text-text-secondary hover:bg-dark-800/50 hover:text-text-primary'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`text-xl ${isActive ? 'text-accent-gold' : 'text-text-muted group-hover:text-text-secondary'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile Section at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-800">
                    <div className="glass-card p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center text-dark-900 font-bold shadow-glow-gold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-text-primary truncate">{user?.name}</p>
                                <p className="text-xs text-text-muted capitalize">{user?.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-danger/20 text-danger rounded-lg hover:bg-danger/30 transition-smooth text-sm font-medium"
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="ml-72">
                {/* Top Header Bar */}
                <header className="sticky top-0 z-20 bg-dark-850/80 backdrop-blur-xl border-b border-dark-800">
                    <div className="flex items-center justify-between px-8 py-4">
                        <div>
                            <h2 className="text-xl font-semibold text-text-primary">
                                Welcome back, {user?.name}!
                            </h2>
                            <p className="text-sm text-text-muted capitalize mt-0.5">
                                {user?.role} Dashboard
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="hidden md:block w-80">
                                <SearchBar />
                            </div>

                            {/* Notification Bell */}
                            <NotificationDropdown />

                            {/* Profile Icon */}
                            <ProfileDropdown />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
