import React from 'react';
import { cn } from '../lib/utils';

export const Table = ({ children, className, ...props }) => {
    return (
        <div className="overflow-x-auto">
            <table className={cn('min-w-full divide-y divide-neutral-200', className)} {...props}>
                {children}
            </table>
        </div>
    );
};

export const TableHeader = ({ children, className, ...props }) => {
    return (
        <thead className={cn('bg-neutral-50', className)} {...props}>
            {children}
        </thead>
    );
};

export const TableBody = ({ children, className, ...props }) => {
    return (
        <tbody className={cn('bg-white divide-y divide-neutral-200', className)} {...props}>
            {children}
        </tbody>
    );
};

export const TableRow = ({ children, className, ...props }) => {
    return (
        <tr className={cn('hover:bg-neutral-50 transition-colors', className)} {...props}>
            {children}
        </tr>
    );
};

export const TableHead = ({ children, className, ...props }) => {
    return (
        <th
            className={cn(
                'px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider',
                className
            )}
            {...props}
        >
            {children}
        </th>
    );
};

export const TableCell = ({ children, className, ...props }) => {
    return (
        <td className={cn('px-6 py-4 text-sm text-neutral-900', className)} {...props}>
            {children}
        </td>
    );
};
