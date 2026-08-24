import React from 'react';
import { cn } from '../lib/utils';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

export const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    iconBgColor = 'bg-primary-100',
    iconColor = 'text-primary-600',
    className
}) => {
    const isPositiveTrend = trend === 'up';

    return (
        <div className={cn(
            'bg-white rounded-xl shadow-soft p-6 border border-neutral-200',
            'hover:shadow-medium transition-all duration-200',
            className
        )}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-500 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-neutral-900">{value}</p>

                    {trendValue && (
                        <div className={cn(
                            'flex items-center gap-1 mt-2 text-sm font-medium',
                            isPositiveTrend ? 'text-green-600' : 'text-red-600'
                        )}>
                            {isPositiveTrend ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>

                {Icon && (
                    <div className={cn(
                        'p-3 rounded-lg',
                        iconBgColor
                    )}>
                        <Icon className={cn('text-2xl', iconColor)} />
                    </div>
                )}
            </div>
        </div>
    );
};
