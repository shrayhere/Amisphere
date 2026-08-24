import React from 'react';

/**
 * AttendanceIndicator Component - Dark Theme
 * Circular status badge showing attendance percentage
 * Green >= 75%, Yellow 50-74%, Red < 50%
 */
const AttendanceIndicator = ({
    percentage,
    size = 'md',
    showPercentage = false,
    showTooltip = true,
    className = ''
}) => {
    const getColor = () => {
        if (percentage >= 75) return 'success';
        if (percentage >= 50) return 'warning';
        return 'danger';
    };

    const colors = {
        success: {
            bg: 'bg-success',
            glow: 'shadow-glow-success',
            text: 'text-success',
        },
        warning: {
            bg: 'bg-warning',
            glow: 'shadow-glow-warning',
            text: 'text-warning',
        },
        danger: {
            bg: 'bg-danger',
            glow: 'shadow-glow-danger',
            text: 'text-danger',
        },
    };

    const sizes = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4',
    };

    const color = getColor();
    const colorClasses = colors[color];

    const indicator = (
        <div className={`relative inline-flex items-center gap-2 ${className}`}>
            <div className={`${sizes[size]} ${colorClasses.bg} ${colorClasses.glow} rounded-full animate-pulse`} />
            {showPercentage && (
                <span className={`text-xs font-semibold ${colorClasses.text}`}>
                    {percentage}%
                </span>
            )}
        </div>
    );

    if (showTooltip) {
        return (
            <div className="group relative inline-block">
                {indicator}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-dark-800 text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-elevation-md">
                    Attendance: {percentage}%
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-dark-800" />
                </div>
            </div>
        );
    }

    return indicator;
};

export default AttendanceIndicator;
