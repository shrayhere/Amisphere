import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUser, FaBook, FaBullhorn, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

/**
 * SearchBar Component - Dark Theme
 * Role-based search functionality with dropdown results
 */
const SearchBar = ({ className = '' }) => {
    const { user } = useAuth();
    const { data } = useData();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ users: [], courses: [], notices: [] });
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults({ users: [], courses: [], notices: [] });
            setIsOpen(false);
            return;
        }

        const timer = setTimeout(() => {
            performSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, data, user]);

    const performSearch = (searchQuery) => {
        const q = searchQuery.toLowerCase();
        const searchResults = { users: [], courses: [], notices: [] };

        // Search users based on role
        if (user.role === 'student') {
            // Students can search classmates and faculty
            searchResults.users = data.users.filter(u =>
                (u.role === 'student' || u.role === 'teacher') &&
                (u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q))
            ).slice(0, 5);
        } else if (user.role === 'teacher') {
            // Teachers can search students
            searchResults.users = data.users.filter(u =>
                u.role === 'student' &&
                (u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q))
            ).slice(0, 5);
        } else if (user.role === 'hod') {
            // HOD can search teachers and students
            searchResults.users = data.users.filter(u =>
                (u.role === 'teacher' || u.role === 'student') &&
                (u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q))
            ).slice(0, 5);
        }

        // Search courses
        if (user.role === 'student') {
            const studentData = data.studentData[user.id];
            if (studentData?.courses) {
                searchResults.courses = studentData.courses.filter(c =>
                    c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
                );
            }
        } else if (user.role === 'teacher') {
            const teacherData = data.teacherData[user.id];
            if (teacherData?.classes) {
                searchResults.courses = teacherData.classes.filter(c =>
                    c.name.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q)
                );
            }
        }

        // Search notices
        if (data.notices) {
            searchResults.notices = data.notices.filter(n =>
                n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
            ).slice(0, 3);
        }

        setResults(searchResults);
        setIsOpen(true);
    };

    const handleResultClick = (type, item) => {
        setQuery('');
        setIsOpen(false);

        if (type === 'user') {
            // Navigate to user profile or details
            console.log('Navigate to user:', item);
        } else if (type === 'course') {
            // Navigate to course details
            console.log('Navigate to course:', item);
        } else if (type === 'notice') {
            // Navigate to notices page
            navigate(`/${user.role}/notices`);
        }
    };

    const hasResults = results.users.length > 0 || results.courses.length > 0 || results.notices.length > 0;

    return (
        <div ref={searchRef} className={`relative ${className}`}>
            {/* Search Input */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users, courses, notices..."
                    className="w-full pl-11 pr-10 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                    >
                        <FaTimes />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && hasResults && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card max-h-96 overflow-y-auto z-50 animate-slide-down">
                    {/* Users */}
                    {results.users.length > 0 && (
                        <div className="p-2">
                            <div className="px-3 py-2 text-xs font-semibold text-text-muted uppercase">
                                Users
                            </div>
                            {results.users.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => handleResultClick('user', user)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-dark-800 transition-colors text-left"
                                >
                                    <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
                                        <FaUser className="text-dark-900 text-sm" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
                                        <p className="text-xs text-text-muted">{user.id} • {user.role}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Courses */}
                    {results.courses.length > 0 && (
                        <div className="p-2 border-t border-dark-700">
                            <div className="px-3 py-2 text-xs font-semibold text-text-muted uppercase">
                                Courses
                            </div>
                            {results.courses.map((course, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleResultClick('course', course)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-dark-800 transition-colors text-left"
                                >
                                    <div className="w-8 h-8 bg-accent-blue/20 rounded-lg flex items-center justify-center">
                                        <FaBook className="text-accent-blue text-sm" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-text-primary truncate">
                                            {course.name || course.subject}
                                        </p>
                                        <p className="text-xs text-text-muted">{course.code || course.id}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Notices */}
                    {results.notices.length > 0 && (
                        <div className="p-2 border-t border-dark-700">
                            <div className="px-3 py-2 text-xs font-semibold text-text-muted uppercase">
                                Notices
                            </div>
                            {results.notices.map((notice) => (
                                <button
                                    key={notice.id}
                                    onClick={() => handleResultClick('notice', notice)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-dark-800 transition-colors text-left"
                                >
                                    <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
                                        <FaBullhorn className="text-warning text-sm" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-text-primary truncate">{notice.title}</p>
                                        <p className="text-xs text-text-muted line-clamp-1">{notice.content}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* No Results */}
            {isOpen && query && !hasResults && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card p-6 text-center z-50 animate-slide-down">
                    <p className="text-text-muted text-sm">No results found for "{query}"</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
