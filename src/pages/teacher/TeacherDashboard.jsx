import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../../components/StatCard';
import ExamSchedule from '../../components/ExamSchedule';
import {
    FaUsers, FaChalkboard, FaClipboardCheck, FaMoneyBillWave,
    FaBook, FaCalendarAlt, FaPaperPlane
} from 'react-icons/fa';
import { format } from 'date-fns';

const TeacherDashboard = () => {
    const { user } = useAuth();
    const {
        data,
        addExam,
        updateExam,
        deleteExam,
        sendHODRequest
    } = useData();
    const navigate = useNavigate();

    const [hodRequestMsg, setHodRequestMsg] = useState('');
    const [showHodModal, setShowHodModal] = useState(false);

    const teacherData = data.teacherData?.[user.id] || {};
    const classes = teacherData.classes || [];
    const salary = teacherData.salary || {};
    const exams = teacherData.exams || {};

    const handleSendHodRequest = (e) => {
        e.preventDefault();
        if (!hodRequestMsg) return;

        sendHODRequest({
            id: Date.now(),
            teacherId: user.id,
            type: 'General',
            status: 'Pending',
            message: hodRequestMsg,
            date: new Date().toISOString()
        });
        setHodRequestMsg('');
        setShowHodModal(false);
        alert('Request sent to HOD.');
    };

    return (
        <div className="space-y-8 pb-10">
            {/* HOD Request Modal */}
            {showHodModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl scale-100">
                        <h3 className="text-xl font-bold mb-4 text-neutral-800">Contact Head of Dept.</h3>
                        <textarea
                            className="w-full p-3 border border-neutral-200 rounded-xl mb-4 h-32 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
                            placeholder="Type your request regarding exams, leaves, or supplies..."
                            value={hodRequestMsg}
                            onChange={(e) => setHodRequestMsg(e.target.value)}
                            autoFocus
                        />
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowHodModal(false)} className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg font-medium transition">Cancel</button>
                            <button onClick={handleSendHodRequest} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition shadow-lg shadow-indigo-200">Send Request</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Faculty Dashboard</h1>
                    <p className="text-neutral-600">Welcome, {user.name} | {user.department}</p>
                </div>
                <button
                    onClick={() => setShowHodModal(true)}
                    className="px-4 py-2 bg-white border border-neutral-200 text-indigo-600 rounded-xl shadow-sm hover:bg-neutral-50 font-medium flex items-center gap-2 transition"
                >
                    <FaPaperPlane className="text-sm" /> Contact HOD
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value={classes.reduce((sum, c) => sum + c.students, 0) || 0} icon={FaUsers} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
                <StatCard title="Active Classes" value={classes.length || 0} icon={FaChalkboard} iconBgColor="bg-purple-100" iconColor="text-purple-600" />
                <StatCard title="Evaluation Pending" value={exams.evaluation?.pending || 0} icon={FaClipboardCheck} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
                <StatCard title="Classes Today" value={Math.max(0, classes.length - 1)} icon={FaCalendarAlt} iconBgColor="bg-green-100" iconColor="text-green-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Classes List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50">
                            <h3 className="font-bold text-lg text-neutral-800 flex items-center gap-2">
                                <FaBook className="text-indigo-600" /> My Classes
                            </h3>
                        </div>
                        <div className="p-6 grid gap-4">
                            {classes.length > 0 ? (
                                classes.map((cls, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-neutral-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group">
                                        <div>
                                            <h4 className="font-bold text-neutral-800">{cls.subject}</h4>
                                            <p className="text-sm text-neutral-500">{cls.name} • {cls.students} Students</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex items-center gap-3 w-full sm:w-auto">
                                            <span className="text-xs font-medium px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full">{cls.time}</span>
                                            <button
                                                onClick={() => navigate(`/teacher/classes/${cls.id}`)}
                                                className="flex-1 sm:flex-none text-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-700 shadow-lg shadow-indigo-200 translate-y-0 sm:translate-y-2 group-hover:translate-y-0"
                                            >
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-neutral-500">No classes assigned.</p>
                            )}
                        </div>
                    </div>

                    <ExamSchedule exams={data.examSchedule || []} isPublished={data.examPublished} onSave={updateExam} onAdd={addExam} onDelete={deleteExam} />
                </div>

                {/* Sidebar Mock Calendar */}
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-neutral-800 flex items-center gap-2">
                                <FaCalendarAlt className="text-blue-500" /> Calendar
                            </h3>
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-200 font-bold">Synced</span>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="flex gap-3 p-3 rounded-xl hover:bg-neutral-50 transition border-l-4 border-blue-500 bg-blue-50/30">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-neutral-800">Staff Meeting</p>
                                    <p className="text-xs text-neutral-500">10:00 AM • Conf Room</p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-3 rounded-xl hover:bg-neutral-50 transition border-l-4 border-indigo-500 bg-indigo-50/30">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-neutral-800">Java Lab</p>
                                    <p className="text-xs text-neutral-500">02:00 PM • Lab 1</p>
                                </div>
                            </div>
                            <button onClick={() => navigate('/teacher/timetable')} className="w-full text-center text-xs text-blue-600 font-semibold mt-2 hover:underline">View Full Timetable</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50">
                            <h3 className="font-bold text-lg text-neutral-800 flex items-center gap-2">
                                <FaMoneyBillWave className="text-emerald-600" /> Salary
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-3xl font-bold text-emerald-700">₹{salary.total?.toLocaleString()}</p>
                            <p className="text-xs text-neutral-500 mt-1">Paid • {format(new Date(), 'MMMM yyyy')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
