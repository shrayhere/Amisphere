import React from 'react';
import { cn } from '../lib/utils';

export const Card = ({ children, className, padding = true, ...props }) => {
    return (
        <div
            className={cn(
                'bg-white rounded-xl shadow-soft border border-neutral-200',
                'transition-shadow duration-200',
                padding && 'p-6',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className, ...props }) => {
    return (
        <div className={cn('mb-4', className)} {...props}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className, ...props }) => {
    return (
        <h3 className={cn('text-xl font-bold text-neutral-900', className)} {...props}>
            {children}
        </h3>
    );
};

export const CardDescription = ({ children, className, ...props }) => {
    return (
        <p className={cn('text-sm text-neutral-500 mt-1', className)} {...props}>
            {children}
        </p>
    );
};

export const CardContent = ({ children, className, ...props }) => {
    return (
        <div className={cn(className)} {...props}>
            {children}
        </div>
    );
};

export const CardFooter = ({ children, className, ...props }) => {
    return (
        <div className={cn('mt-4 pt-4 border-t border-neutral-200', className)} {...props}>
            {children}
        </div>
    );
};
