import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import ExamSchedule from '../../components/ExamSchedule';
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaArrowRight, FaChartLine } from 'react-icons/fa';

const HODDashboard = () => {
    const { user } = useAuth();
    const { data, addExam, updateExam, deleteExam, publishExams } = useData();
    const navigate = useNavigate();

    const pendingApprovals = data.requests.filter(r => r.status === 'Pending HOD').length;
    // For demo, assume HOD manages all CSE students/teachers.
    // In real app, filter by user.department
    const deptTeachers = data.users.filter(u => u.role === 'teacher' && u.department === user.department);
    const deptStudents = data.users.filter(u => u.role === 'student');

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Department Overview</h1>
                    <p className="text-neutral-600">Computer Science & Engineering</p>
                </div>
                <button className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl shadow-lg hover:bg-neutral-800 transition-all flex items-center gap-2">
                    <FaChartLine /> Download Report
                </button>
            </div>

            {/* Scale-up Animation Container */}
            <div className="animate-scale-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Students"
                        value={deptStudents.length}
                        icon={FaUserGraduate}
                        iconBgColor="bg-blue-100"
                        iconColor="text-blue-600"
                    />
                    <div
                        onClick={() => navigate('/hod/teachers')}
                        className="cursor-pointer transition-transform hover:-translate-y-1 block"
                    >
                        <StatCard
                            title="Faculty Members"
                            value={deptTeachers.length}
                            icon={FaChalkboardTeacher}
                            iconBgColor="bg-purple-100"
                            iconColor="text-purple-600"
                        />
                    </div>
                    <StatCard
                        title="Pending Approvals"
                        value={pendingApprovals}
                        icon={FaClipboardList}
                        iconBgColor="bg-orange-100"
                        iconColor="text-orange-600"
                    />
                </div>
            </div>

            {/* Deep Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Academic Performance */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-neutral-800">Academic Performance</h3>
                        <select className="bg-neutral-50 border border-neutral-200 text-xs rounded-lg px-2 py-1 outline-none">
                            <option>This Sem</option>
                            <option>Last Sem</option>
                        </select>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-neutral-500">Department Avg CGPA</span>
                                <span className="font-bold text-neutral-800">8.4 / 10.0</span>
                            </div>
                            <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '84%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-neutral-500">Attendance Rate</span>
                                <span className="font-bold text-neutral-800">92%</span>
                            </div>
                            <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-neutral-500">Syllabus Completion</span>
                                <span className="font-bold text-neutral-800">78%</span>
                            </div>
                            <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 flex flex-col">
                    <h3 className="font-bold text-lg text-neutral-800 mb-6">Department Activities</h3>
                    <div className="flex-1 space-y-4">
                        <div className="flex gap-4 items-start p-4 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-neutral-100">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                <FaClipboardList />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-neutral-800 text-sm">Review Budget Proposals</p>
                                <p className="text-xs text-neutral-500 mt-0.5">Submitted by Labs Committee</p>
                            </div>
                            <span className="text-[10px] bg-neutral-100 px-2 py-1 rounded text-neutral-500">Today</span>
                        </div>

                        <div className="flex gap-4 items-start p-4 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-neutral-100">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                <FaChalkboardTeacher />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-neutral-800 text-sm">Manage Faculty Load</p>
                                <p className="text-xs text-neutral-500 mt-0.5">Distribution for Next Semester</p>
                            </div>
                            <span className="text-[10px] bg-neutral-100 px-2 py-1 rounded text-neutral-500">Urgent</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/hod/teachers')}
                        className="w-full py-3 mt-6 border border-neutral-200 rounded-xl font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 group"
                    >
                        Go to Faculty Management <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Exam Schedule Management */}
            <ExamSchedule
                exams={data.examSchedule || []}
                isPublished={data.examPublished}
                onPublish={publishExams}
                onSave={updateExam}
                onAdd={addExam}
                onDelete={deleteExam}
            />
        </div>
    );
};

export default HODDashboard;
