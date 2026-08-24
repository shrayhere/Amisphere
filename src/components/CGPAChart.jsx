import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Area,
    AreaChart,
} from 'recharts';

const CGPAChart = ({ data, studentId = "STD000" }) => {
    // data format: [{ semester: 'Sem 1', cgpa: 8.5 }, ...]

    if (!data || data.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-neutral-400 text-sm">
                No academic history available
            </div>
        );
    }

    // Calculate Trend & Status
    const currentCGPA = data[data.length - 1].cgpa;
    const previousCGPA = data.length > 1 ? data[data.length - 2].cgpa : currentCGPA;

    let status = "Safe";
    let statusColor = "text-green-600";
    let statusBg = "bg-green-100";
    let dotColor = "#16a34a";
    let gradientStart = "#bbf7d0"; // green-200
    let gradientEnd = "#ffffff";

    if (currentCGPA < 6.0) {
        status = "Critical";
        statusColor = "text-red-600";
        statusBg = "bg-red-100";
        dotColor = "#dc2626";
        gradientStart = "#fecaca"; // red-200
    } else if (currentCGPA < 7.5) {
        status = "On Edge";
        statusColor = "text-yellow-600";
        statusBg = "bg-yellow-100";
        dotColor = "#ca8a04";
        gradientStart = "#fde047"; // yellow-200
    }

    // Determine Trend
    let trend = "Stable";
    let trendIcon = "→";
    if (currentCGPA > previousCGPA) {
        trend = "Improving";
        trendIcon = "↗";
    } else if (currentCGPA < previousCGPA) {
        trend = "Declining";
        trendIcon = "↘";
    }

    // Generate unique ID for gradients based on studentId to prevent conflicts in lists
    const gradientId = `colorGradient-${studentId}`;

    // Generate a visual seed from studentId for "unique visual variation"
    // Just a simple way to vary the stroke width or chaos slightly if needed, 
    // but for professional dashboard, subtle color shift or unique key is better.
    // For now, we will stick to the status color as the primary variation driver 
    // but add a unique key to the chart to satisfy React reconciliation if used in lists.

    return (
        <div className="w-full h-full min-h-[160px] relative flex flex-col" key={studentId}>
            <div className="flex justify-between items-start mb-2 px-1">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-neutral-800">{currentCGPA}</span>
                    <span className={`text-[10px] font-semibold ${status === 'Critical' ? 'text-red-500' : status === 'Safe' ? 'text-green-500' : 'text-neutral-500'} flex items-center gap-1`}>
                        {trend} {trendIcon}
                    </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded border shadow-sm ${statusColor} ${statusBg}`}>
                    {status}
                </span>
            </div>

            <div className="flex-1 min-h-0 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={dotColor} stopOpacity={0.2} />
                                <stop offset="95%" stopColor={dotColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                        <XAxis
                            dataKey="semester"
                            tick={{ fontSize: 10, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            dy={5}
                        />
                        <YAxis
                            domain={[0, 10]}
                            tick={{ fontSize: 10, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            hide={true}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px', fontWeight: '600', color: dotColor }}
                        />
                        <ReferenceLine y={6.0} stroke="red" strokeDasharray="3 3" opacity={0.3} />
                        <Area
                            type="monotone"
                            dataKey="cgpa"
                            stroke={dotColor}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill={`url(#${gradientId})`}
                            dot={{ r: 3, strokeWidth: 2, fill: '#fff', stroke: dotColor }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: dotColor }}
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CGPAChart;
