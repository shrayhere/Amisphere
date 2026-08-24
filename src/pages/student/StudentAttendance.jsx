import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { FaCalendarCheck, FaTimes } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StudentAttendance = () => {
    const { user } = useAuth();
    const { data } = useData();

    const studentInfo = data.studentData?.[user.id] || {};
    const attendance = studentInfo.attendance || {};

    // Prepare data for pie chart
    const chartData = Object.entries(attendance).map(([subject, data]) => ({
        name: subject,
        value: data.percentage,
        present: data.present,
        total: data.total
    }));

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    const avgAttendance = chartData.length > 0
        ? Math.round(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length)
        : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900">Attendance</h2>
                    <p className="text-neutral-500">Track your class attendance</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-neutral-500">Overall Attendance</p>
                    <p className={`text-3xl font-bold ${avgAttendance >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                        {avgAttendance}%
                    </p>
                </div>
            </div>

            {/* Alert */}
            {avgAttendance < 75 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <FaTimes className="text-red-600 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-red-900">Attendance Below 75%</h4>
                        <p className="text-sm text-red-700">
                            You need to maintain at least 75% attendance. Please attend classes regularly.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subject-wise Attendance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Subject-wise Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.entries(attendance).map(([subject, data]) => (
                                <div key={subject}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-neutral-900">{subject}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-neutral-500">
                                                {data.present}/{data.total}
                                            </span>
                                            <Badge variant={data.percentage >= 75 ? 'success' : 'danger'}>
                                                {data.percentage}%
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="w-full bg-neutral-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${data.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'}`}
                                            style={{ width: `${data.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${value}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Tips */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center gap-2">
                            <FaCalendarCheck className="text-primary-600" />
                            Attendance Tips
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-neutral-700">
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600">•</span>
                            Maintain at least 75% attendance to be eligible for exams
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600">•</span>
                            Medical leave applications must be submitted within 3 days
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600">•</span>
                            Contact your faculty for attendance discrepancies
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentAttendance;
