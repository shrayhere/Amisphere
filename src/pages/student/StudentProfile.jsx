import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FaUser, FaEnvelope, FaIdCard, FaGraduationCap, FaCalendar, FaChartLine } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import CourseCard from '../../components/CourseCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { ErrorMessage } from '../../components/ErrorBoundary';

/**
 * StudentProfile Page - Dark Theme
 * Displays student personal information, courses, and academic details
 */
const StudentProfile = () => {
    const { user } = useAuth();
    const { data } = useData();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        try {
            // Simulate data fetch
            const userInfo = data.users.find(u => u.id === user.id);
            const studentData = data.studentData[user.id];

            if (!userInfo || !studentData) {
                throw new Error('Profile data not found');
            }

            setProfileData({
                ...userInfo,
                ...studentData
            });
        } catch (err) {
            console.error('Failed to load student profile:', err);
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
                <p className="text-text-muted">View and manage your academic profile</p>
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
                                    <p className="text-xs text-text-muted">Student ID</p>
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
                                <FaGraduationCap className="text-text-muted" />
                                <div>
                                    <p className="text-xs text-text-muted">Department</p>
                                    <p className="text-sm font-semibold text-text-primary">{profileData.department}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Academic Details */}
            <Card>
                <h2 className="text-xl font-bold text-text-primary mb-4">Academic Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center">
                            <FaGraduationCap className="text-accent-blue text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Course</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.course}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                            <FaCalendar className="text-success text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Semester</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.semester}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                            <FaChartLine className="text-accent-gold text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">CGPA</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.exams?.cgpa || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Enrolled Courses */}
            <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">Enrolled Courses</h2>
                {profileData.courses && profileData.courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profileData.courses.map((course, idx) => {
                            // Get attendance data for this course
                            const attendance = profileData.attendance?.[course.name];
                            return (
                                <CourseCard
                                    key={idx}
                                    course={{
                                        ...course,
                                        attendance: attendance
                                    }}
                                    showAttendance={true}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <EmptyState
                        title="No Courses Enrolled"
                        message="You are not currently enrolled in any courses."
                        variant="folder"
                    />
                )}
            </div>

            {/* Faculty Guide */}
            {profileData.facultyGuide && (
                <Card>
                    <h2 className="text-xl font-bold text-text-primary mb-4">Faculty Guide</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-text-muted">Name</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.facultyGuide.name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Email</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.facultyGuide.email}</p>
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Office</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.facultyGuide.office}</p>
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Office Hours</p>
                            <p className="text-sm font-semibold text-text-primary">{profileData.facultyGuide.hours}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default StudentProfile;
