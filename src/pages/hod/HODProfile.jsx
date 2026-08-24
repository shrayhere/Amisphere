import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FaUser, FaEnvelope, FaIdCard, FaBriefcase, FaUsers, FaChartBar } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { ErrorMessage } from '../../components/ErrorBoundary';

/**
 * HODProfile Page - Dark Theme
 * Displays HOD personal information, department details, and statistics
 */
const HODProfile = () => {
    const { user } = useAuth();
    const { data } = useData();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        try {
            // Simulate data fetch
            const userInfo = data.users.find(u => u.id === user.id);

            if (!userInfo) {
                throw new Error('Profile data not found');
            }

            // Get department statistics
            const departmentTeachers = data.users.filter(u =>
                u.role === 'teacher' && u.department === userInfo.department
            );
            const departmentStudents = data.users.filter(u =>
                u.role === 'student' && u.department === userInfo.department
            );

            setProfileData({
                ...userInfo,
                stats: {
                    totalTeachers: departmentTeachers.length,
                    totalStudents: departmentStudents.length,
                    pendingRequests: data.hodRequests?.filter(r => r.status === 'pending').length || 0,
                }
            });
        } catch (err) {
            console.error('Failed to load HOD profile:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user.id, data]);

    if (loading) {
        return <LoadingSpinner text="Loading profile..." />;
    }

    if (error) {
        return <ErrorMessage error={error} title="Failed to Load Profile" />;
    }

    if (!profileData) {
        return <EmptyState title="Profile Not Found" message="Your profile data could not be loaded." />;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">My Profile</h1>
                <p className="text-text-muted">View and manage your HOD profile</p>
            </div>

            {/* Personal Information */}
            <Card>
                <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-gradient-gold rounded-2xl flex items-center justify-center text-4xl font-bold text-dark-900 shadow-glow-gold flex-shrink-0">
                        {profileData.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-text-primary mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <FaUser className="text-text-muted" />
                                <div>
                                    <p className="text-xs text-text-muted">Full Name</p>
                                    <p className="text-sm font-semibold text-text-primary">{profileData.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaIdCard className="text-text-muted" />
                                <div>
                                    <p className="text-xs text-text-muted">HOD ID</p>
                                    <p className="text-sm font-semibold text-text-primary">{profileData.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-text-muted" />
                                <div>
                                    <p className="text-xs text-text-muted">Email</p>
                                    <p className="text-sm font-semibold text-text-primary">{profileData.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaBriefcase className="text-text-muted" />
                                <div>
                                    <p className="text-xs text-text-muted">Department</p>
                                    <p className="text-sm font-semibold text-text-primary">{profileData.department}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Department Statistics */}
            <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">Department Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-accent-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaUsers className="text-accent-blue text-2xl" />
                            </div>
                            <div>
                                <p className="text-xs text-text-muted">Total Faculty</p>
                                <p className="text-2xl font-bold text-text-primary">{profileData.stats.totalTeachers}</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-success/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaUser className="text-success text-2xl" />
                            </div>
                            <div>
                                <p className="text-xs text-text-muted">Total Students</p>
                                <p className="text-2xl font-bold text-text-primary">{profileData.stats.totalStudents}</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-warning/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaChartBar className="text-warning text-2xl" />
                            </div>
                            <div>
                                <p className="text-xs text-text-muted">Pending Requests</p>
                                <p className="text-2xl font-bold text-text-primary">{profileData.stats.pendingRequests}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Professional Details */}
            <Card>
                <h2 className="text-xl font-bold text-text-primary mb-4">Professional Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                            <FaBriefcase className="text-accent-gold text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Designation</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.designation}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                            <FaUsers className="text-accent-blue text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Department</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.department}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default HODProfile;
