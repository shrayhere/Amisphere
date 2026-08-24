import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { FaUserTie, FaClock, FaBook } from 'react-icons/fa';

const StudentCourses = () => {
    const { user } = useAuth();
    const { data } = useData();

    const studentInfo = data.studentData?.[user.id] || {};
    const courses = studentInfo.courses || [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-neutral-900">My Courses</h2>
                <p className="text-neutral-500">Enrolled courses for {user?.semester} Semester</p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course, idx) => (
                    <Card key={idx} className="hover:shadow-medium transition-shadow cursor-pointer">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">{course.name}</CardTitle>
                                    <p className="text-sm text-neutral-500 mt-1">{course.code}</p>
                                </div>
                                <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                                    {course.credits} Credits
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-neutral-700">
                                    <FaUserTie className="text-neutral-400" />
                                    <span>{course.faculty}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-700">
                                    <FaClock className="text-neutral-400" />
                                    <span>{course.schedule}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-700">
                                    <FaBook className="text-neutral-400" />
                                    <span>View Materials</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {courses.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <p className="text-neutral-500">No courses enrolled for this semester</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default StudentCourses;
