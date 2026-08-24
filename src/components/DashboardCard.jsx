import React from 'react';
import Card from './ui/Card';

/**
 * DashboardCard Component - Dark Theme
 * Features: glassmorphism styling, hover elevation, icon with gradient, trend indicators
 */
const DashboardCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendLabel,
    color = 'gold',
    className = '',
    onClick,
    ...props
}) => {
    const colorClasses = {
        gold: 'bg-accent-gold/20 text-accent-gold',
        blue: 'bg-accent-blue/20 text-accent-blue',
        success: 'bg-success/20 text-success',
        danger: 'bg-danger/20 text-danger',
    };

    const trendColors = {
        up: 'text-success',
        down: 'text-danger',
        neutral: 'text-text-muted',
    };

    return (
        <Card
            hover={!!onClick}
            neonOutline={!!onClick}
            className={`cursor-${onClick ? 'pointer' : 'default'} ${className}`}
            onClick={onClick}
            {...props}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-text-muted text-sm font-medium mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-text-primary mb-3">{value}</h3>

                    {trend && (
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${trendColors[trend.direction]}`}>
                                {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'} {trend.value}
                            </span>
                            {trendLabel && (
                                <span className="text-xs text-text-muted">{trendLabel}</span>
                            )}
                        </div>
                    )}
                </div>

                {Icon && (
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
                        <Icon className="text-2xl" />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default DashboardCard;
