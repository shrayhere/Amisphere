import React, { useState } from 'react';

/**
 * DataTable Component - Dark Theme
 * Features: alternating row backgrounds, sticky header with blur, row highlight, sortable columns
 */
const DataTable = ({
    columns = [],
    data = [],
    onRowClick,
    className = '',
    ...props
}) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);

    return (
        <div className={`glass-card overflow-hidden ${className}`} {...props}>
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* Sticky Header with Blur */}
                    <thead className="sticky top-0 bg-dark-850/95 backdrop-blur-xl border-b border-dark-700 z-10">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                    className={`px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:text-text-secondary transition-colors' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && sortConfig.key === column.key && (
                                            <span className="text-accent-gold">
                                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {sortedData.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={`
                                    border-b border-dark-800 transition-smooth
                                    ${rowIndex % 2 === 0 ? 'bg-dark-900/50' : 'bg-dark-850/30'}
                                    ${onRowClick ? 'cursor-pointer hover:bg-dark-800/80 hover:shadow-glow-gold' : ''}
                                `}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-6 py-4 text-sm text-text-primary"
                                    >
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : row[column.key]
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {sortedData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-text-muted">No data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataTable;
