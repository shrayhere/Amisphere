import React from 'react';
import { FaUser, FaClock, FaDoorOpen } from 'react-icons/fa';
import Card from './ui/Card';
import AttendanceIndicator from './AttendanceIndicator';

/**
 * CourseCard Component - Dark Theme
 * Displays course information with attendance indicator
 */
const CourseCard = ({
    course,
    onClick,
    showAttendance = true,
    className = ''
}) => {
    const {
        code,
        name,
        faculty,
        credits,
        schedule,
        room,
        attendance, // { present, total, percentage }
    } = course;

    const attendancePercentage = attendance?.percentage || 0;

    return (
        <Card
            hover={!!onClick}
            neonOutline={!!onClick}
            className={`cursor-${onClick ? 'pointer' : 'default'} ${className}`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-text-primary">{name}</h3>
                        {showAttendance && attendance && (
                            <AttendanceIndicator
                                percentage={attendancePercentage}
                                size="md"
                                showTooltip={true}
                            />
                        )}
                    </div>
                    <p className="text-sm text-text-muted">{code}</p>
                </div>
                {credits && (
                    <div className="px-3 py-1 bg-accent-gold/20 text-accent-gold rounded-lg text-xs font-semibold">
                        {credits} Credits
                    </div>
                )}
            </div>

            <div className="space-y-2">
                {faculty && (
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <FaUser className="text-text-muted" />
                        <span>{faculty}</span>
                    </div>
                )}

                {schedule && (
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <FaClock className="text-text-muted" />
                        <span>{schedule}</span>
                    </div>
                )}

                {room && (
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <FaDoorOpen className="text-text-muted" />
                        <span>{room}</span>
                    </div>
                )}
            </div>

            {showAttendance && attendance && (
                <div className="mt-4 pt-4 border-t border-dark-700">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Attendance</span>
                        <div className="flex items-center gap-2">
                            <span className="text-text-secondary">
                                {attendance.present}/{attendance.total} classes
                            </span>
                            <span className={`font-semibold ${attendancePercentage >= 75 ? 'text-success' :
                                    attendancePercentage >= 50 ? 'text-warning' :
                                        'text-danger'
                                }`}>
                                {attendancePercentage}%
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default CourseCard;
