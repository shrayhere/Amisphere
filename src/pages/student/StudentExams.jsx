import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/Table';
import { Badge } from '../../components/Badge';
import { FaCalendar, FaTrophy } from 'react-icons/fa';

const StudentExams = () => {
    const { user } = useAuth();
    const { data } = useData();

    const studentInfo = data.studentData?.[user.id] || {};
    const exams = studentInfo.exams || { upcoming: [], results: [], cgpa: 0 };

    const getGradeVariant = (grade) => {
        if (grade.startsWith('A')) return 'success';
        if (grade.startsWith('B')) return 'primary';
        if (grade.startsWith('C')) return 'warning';
        return 'default';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900">Exams & Results</h2>
                    <p className="text-neutral-500">View exam schedule and academic performance</p>
                </div>
                <div className="text-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white">
                    <p className="text-sm opacity-90">Current CGPA</p>
                    <p className="text-3xl font-bold">{exams.cgpa}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                        <FaTrophy className="text-yellow-300" />
                        <span className="text-xs">on 10.0 scale</span>
                    </div>
                </div>
            </div>

            {/* Upcoming Exams */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center gap-2">
                            <FaCalendar className="text-primary-600" />
                            Upcoming Exams
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {exams.upcoming && exams.upcoming.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Room</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {exams.upcoming.map((exam, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell className="font-semibold">{exam.subject}</TableCell>
                                        <TableCell>{exam.date}</TableCell>
                                        <TableCell>{exam.time}</TableCell>
                                        <TableCell><Badge variant="info">{exam.room}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-neutral-500 text-center py-8">No upcoming exams</p>
                    )}
                </CardContent>
            </Card>

            {/* Previous Results */}
            <Card>
                <CardHeader>
                    <CardTitle>Previous Semester Results</CardTitle>
                </CardHeader>
                <CardContent>
                    {exams.results && exams.results.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Marks</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Credits</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {exams.results.map((result, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{result.semester}</TableCell>
                                        <TableCell className="font-medium">{result.subject}</TableCell>
                                        <TableCell className="font-semibold">{result.marks}/100</TableCell>
                                        <TableCell>
                                            <Badge variant={getGradeVariant(result.grade)}>
                                                {result.grade}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{result.credits}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-neutral-500 text-center py-8">No results available</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentExams;
