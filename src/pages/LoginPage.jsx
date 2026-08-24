import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaUniversity, FaUser, FaLock } from 'react-icons/fa';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';

const LoginPage = () => {
    const [role, setRole] = useState('student');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const success = login(userId, password, role);
        if (success) {
            navigate(`/${role}`);
        } else {
            setError('Invalid credentials. Please verify your ID and password.');
        }
    };

    const handleAutoFill = (demoRole, id, pw) => {
        setRole(demoRole);
        setUserId(id);
        setPassword(pw);
        setError('');
    };

    const roles = [
        { id: 'student', label: 'Student', icon: FaUserGraduate },
        { id: 'teacher', label: 'Faculty', icon: FaChalkboardTeacher },
        { id: 'hod', label: 'HOD', icon: FaUserTie }
    ];

    return (
        <div className="min-h-screen flex bg-dark-950 font-sans">
            {/* Left Side - Amity University Building Image */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1986&q=80')",
                    }}
                />

                {/* Dark Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-850/90 to-dark-900/95" />

                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
                    {/* Logo Icon */}
                    <div className="w-24 h-24 bg-gradient-gold rounded-2xl flex items-center justify-center mb-8 shadow-glow-gold-lg animate-float">
                        <FaUniversity className="text-5xl text-dark-900" />
                    </div>

                    {/* Heading */}
                    <h1 className="text-6xl font-bold mb-6 tracking-tight leading-tight">
                        Welcome to <span className="gradient-text-gold">Amisphere</span>
                    </h1>

                    <p className="text-xl text-text-secondary leading-relaxed font-light max-w-lg mb-12">
                        The ultimate academic gateway for Amity University. Manage your courses, exams, and campus life with a seamless digital experience.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                        <div className="glass-card p-6 text-left">
                            <div className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center mb-4">
                                <FaUserGraduate className="text-accent-blue text-xl" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-text-primary">For Students</h3>
                            <p className="text-sm text-text-muted">Access results, timetables, and fee receipts instantly.</p>
                        </div>
                        <div className="glass-card p-6 text-left">
                            <div className="w-12 h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center mb-4">
                                <FaChalkboardTeacher className="text-accent-gold text-xl" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-text-primary">For Faculty</h3>
                            <p className="text-sm text-text-muted">Manage attendance, grades, and student progress.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-dark-900">
                <div className="w-full max-w-md animate-fade-in">
                    {/* Glassmorphism Login Card */}
                    <div className="glass-card p-8 space-y-6">
                        {/* Header */}
                        <div className="text-center">
                            <div className="inline-flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center shadow-glow-gold">
                                    <FaUniversity className="text-2xl text-dark-900" />
                                </div>
                                <h2 className="text-3xl font-bold text-text-primary">Amisphere</h2>
                            </div>
                            <p className="text-text-muted">Sign in to access your portal</p>
                        </div>

                        {/* Quick Demo Credentials Bar */}
                        <div className="bg-dark-800/40 border border-dark-700/60 rounded-xl p-3 space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[11px] font-bold tracking-wider text-accent-gold uppercase flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
                                    Quick Demo Fill
                                </span>
                                <span className="text-[10px] text-text-muted">Click any role to autofill</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleAutoFill('student', 'DIP2024STU001', '123')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                                        role === 'student' && userId === 'DIP2024STU001'
                                            ? 'bg-accent-gold/20 border-accent-gold text-accent-gold shadow-glow-gold-sm'
                                            : 'bg-dark-900/60 border-dark-700 text-text-secondary hover:border-dark-600 hover:text-text-primary'
                                    }`}
                                >
                                    <span className="font-semibold text-text-primary mb-0.5">Student</span>
                                    <span className="text-[10px] text-text-muted font-mono">DIP2024STU001</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleAutoFill('teacher', 'FAC001', '123')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                                        role === 'teacher' && userId === 'FAC001'
                                            ? 'bg-accent-gold/20 border-accent-gold text-accent-gold shadow-glow-gold-sm'
                                            : 'bg-dark-900/60 border-dark-700 text-text-secondary hover:border-dark-600 hover:text-text-primary'
                                    }`}
                                >
                                    <span className="font-semibold text-text-primary mb-0.5">Faculty</span>
                                    <span className="text-[10px] text-text-muted font-mono">FAC001</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleAutoFill('hod', 'HOD001', '123')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                                        role === 'hod' && userId === 'HOD001'
                                            ? 'bg-accent-gold/20 border-accent-gold text-accent-gold shadow-glow-gold-sm'
                                            : 'bg-dark-900/60 border-dark-700 text-text-secondary hover:border-dark-600 hover:text-text-primary'
                                    }`}
                                >
                                    <span className="font-semibold text-text-primary mb-0.5">HOD</span>
                                    <span className="text-[10px] text-text-muted font-mono">HOD001</span>
                                </button>
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="bg-dark-800/50 p-1.5 rounded-xl flex gap-1 border border-dark-700">
                            {roles.map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => setRole(r.id)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-smooth ${role === r.id
                                            ? 'bg-gradient-gold text-dark-900 shadow-glow-gold'
                                            : 'text-text-muted hover:text-text-secondary hover:bg-dark-700/50'
                                        }`}
                                >
                                    <r.icon className={role === r.id ? 'text-dark-900' : 'text-text-muted'} />
                                    {r.label}
                                </button>
                            ))}
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* User ID Input */}
                            <Input
                                label={role === 'student' ? 'Student ID' : role === 'teacher' ? 'Faculty ID' : 'HOD ID'}
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder={role === 'student' ? 'e.g. DIP2024STU001' : 'e.g. FAC001'}
                                icon={FaUser}
                                required
                                error={error && !userId ? 'ID is required' : ''}
                            />

                            {/* Password Input */}
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                icon={FaLock}
                                required
                                error={error && !password ? 'Password is required' : ''}
                            />

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <Toggle
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    label="Remember me"
                                />
                                <a href="#" className="text-sm text-accent-gold hover:text-accent-gold-dark transition-colors">
                                    Forgot Password?
                                </a>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-danger/10 border border-danger/30 text-danger px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-slide-down">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            {/* Login Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                            >
                                Access Dashboard
                            </Button>
                        </form>

                        {/* Support Links */}
                        <div className="pt-6 border-t border-dark-700">
                            <p className="text-center text-xs text-text-muted">
                                Need help? Contact{' '}
                                <a href="#" className="text-accent-gold hover:text-accent-gold-dark transition-colors">
                                    IT Support
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-text-muted mt-6">
                        Protected by Amisphere Security • Amity University
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
