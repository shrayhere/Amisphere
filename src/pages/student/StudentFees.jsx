import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/Table';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { FaDownload, FaExclamationTriangle } from 'react-icons/fa';

const StudentFees = () => {
    const { user } = useAuth();
    const { data } = useData();

    const studentInfo = data.studentData?.[user.id] || {};
    const fees = studentInfo.fees || { total: 0, paid: 0, pending: 0, payments: [] };

    const percentagePaid = fees.total > 0 ? Math.round((fees.paid / fees.total) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-neutral-900">Fee Management</h2>
                <p className="text-neutral-500">View and manage your fee payments</p>
            </div>

            {/* Fee Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-neutral-500 mb-1">Total Fees</p>
                        <p className="text-3xl font-bold text-neutral-900">₹{fees.total.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-neutral-500 mb-1">Paid</p>
                        <p className="text-3xl font-bold text-green-600">₹{fees.paid.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-neutral-500 mb-1">Pending</p>
                        <p className="text-3xl font-bold text-red-600">₹{fees.pending.toLocaleString()}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Progress */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-700">
                                {percentagePaid}% Completed
                            </span>
                            <span className="text-sm text-neutral-500">
                                ₹{fees.paid.toLocaleString()} / ₹{fees.total.toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-3">
                            <div
                                className="bg-green-500 h-3 rounded-full transition-all"
                                style={{ width: `${percentagePaid}%` }}
                            />
                        </div>
                        {fees.pending > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 mt-4">
                                <FaExclamationTriangle className="text-yellow-600 mt-0.5" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-yellow-900">Payment Due</h4>
                                    <p className="text-sm text-yellow-700">
                                        Next payment of ₹{fees.pending.toLocaleString()} is due by{' '}
                                        {new Date(fees.nextDueDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <Button size="sm" variant="secondary">Pay Now</Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Receipt</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fees.payments && fees.payments.map((payment, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="font-semibold">₹{payment.amount.toLocaleString()}</TableCell>
                                    <TableCell className="font-mono text-sm">{payment.receipt}</TableCell>
                                    <TableCell>
                                        <Badge variant={payment.status === 'Paid' ? 'success' : 'warning'}>
                                            {payment.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="ghost" className="gap-2">
                                            <FaDownload /> Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentFees;
