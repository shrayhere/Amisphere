import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FaUser, FaEnvelope, FaIdCard, FaBriefcase, FaClock, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { ErrorMessage } from '../../components/ErrorBoundary';

/**
 * TeacherProfile Page - Dark Theme
 * Displays teacher personal information, assigned classes, and professional details
 */
const TeacherProfile = () => {
    const { user } = useAuth();
    const { data } = useData();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        try {
            // Simulate data fetch
            const userInfo = data.users.find(u => u.id === user.id);
            const teacherData = data.teacherData[user.id];

            if (!userInfo || !teacherData) {
                throw new Error('Profile data not found');
            }

            setProfileData({
                ...userInfo,
                ...teacherData
            });
        } catch (err) {
            console.error('Failed to load teacher profile:', err);
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
                <p className="text-text-muted">View and manage your faculty profile</p>
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
                                    <p className="text-xs text-text-muted">Faculty ID</p>
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

            {/* Professional Details */}
            <Card>
                <h2 className="text-xl font-bold text-text-primary mb-4">Professional Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                            <FaBriefcase className="text-accent-blue text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Designation</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.designation}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                            <FaClock className="text-success text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Experience</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.experience}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                            <FaChalkboardTeacher className="text-accent-gold text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Subject</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.subjects}</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Assigned Classes */}
            <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">Assigned Classes</h2>
                {profileData.classes && profileData.classes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profileData.classes.map((classItem) => (
                            <Card key={classItem.id} hover neonOutline>
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-text-primary mb-1">{classItem.name}</h3>
                                        <p className="text-sm text-text-muted">{classItem.subject}</p>
                                    </div>
                                    <div className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-lg text-xs font-semibold">
                                        {classItem.students} Students
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <FaClock className="text-text-muted" />
                                    <span>{classItem.time}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="No Classes Assigned"
                        message="You are not currently assigned to any classes."
                        variant="folder"
                    />
                )}
            </div>

            {/* Timetable Summary */}
            {profileData.timetable && profileData.timetable.length > 0 && (
                <Card>
                    <h2 className="text-xl font-bold text-text-primary mb-4">Weekly Schedule</h2>
                    <div className="space-y-2">
                        {profileData.timetable.slice(0, 5).map((slot) => (
                            <div
                                key={slot.id}
                                className="flex items-center justify-between p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 text-sm font-semibold text-accent-gold">
                                        {slot.day}
                                    </div>
                                    <div className="text-sm text-text-muted">
                                        {slot.time}
                                    </div>
                                    <div className="text-sm font-medium text-text-primary">
                                        {slot.subject}
                                    </div>
                                </div>
                                <div className="text-xs text-text-muted">
                                    {slot.room}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default TeacherProfile;
