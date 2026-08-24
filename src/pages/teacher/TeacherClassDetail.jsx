import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { format } from 'date-fns';
import {
    FaArrowLeft, FaUsers, FaCalendarAlt, FaCheckCircle,
    FaTimesCircle, FaChartLine, FaClipboardList, FaBullhorn
} from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Sub-Components (Reused/Refactored) ---

const AttendanceTab = ({ classId, date, setDate, initialData, onSave, students }) => {
    const [attendanceMap, setAttendanceMap] = useState(initialData || {});

    useEffect(() => {
        setAttendanceMap(initialData || {});
    }, [initialData, date]);

    const toggleStatus = (studentId, status) => {
        setAttendanceMap(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSave = () => {
        onSave(classId, date, attendanceMap);
        alert(`Attendance for ${date} saved successfully!`);
    };

    const markAll = (status) => {
        const newMap = {};
        students.forEach(s => newMap[s.id] = status);
        setAttendanceMap(newMap);
    };

    const stats = {
        present: Object.values(attendanceMap).filter(s => s === 'Present').length,
        absent: Object.values(attendanceMap).filter(s => s === 'Absent').length
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="font-bold text-lg">Mark Attendance</h3>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 border border-neutral-200 rounded-lg text-sm outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="flex gap-2">
                    <button onClick={() => markAll('Present')} className="text-xs font-semibold px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100">Mark All Present</button>
                    <button onClick={() => markAll('Absent')} className="text-xs font-semibold px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Mark All Absent</button>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {students.map((student, i) => {
                        const status = attendanceMap[student.id] || 'Present';
                        return (
                            <div key={student.id} className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-700">{student.name}</p>
                                        <p className="text-[10px] text-neutral-400 font-mono">{student.id}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleStatus(student.id, 'Present')}
                                        className={`p-2 rounded-full transition-all ${status === 'Present' ? 'bg-green-100 text-green-600 ring-2 ring-green-500/20' : 'bg-neutral-50 text-neutral-300 hover:bg-green-50 hover:text-green-400'}`}
                                    >
                                        <FaCheckCircle className="text-lg" />
                                    </button>
                                    <button
                                        onClick={() => toggleStatus(student.id, 'Absent')}
                                        className={`p-2 rounded-full transition-all ${status === 'Absent' ? 'bg-red-100 text-red-600 ring-2 ring-red-500/20' : 'bg-neutral-50 text-neutral-300 hover:bg-red-50 hover:text-red-400'}`}
                                    >
                                        <FaTimesCircle className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={handleSave}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    Save Attendance
                </button>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Summary</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm">Present</span>
                        <span className="font-bold text-green-600">{stats.present}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">Absent</span>
                        <span className="font-bold text-red-600">{stats.absent}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div
                                style={{ width: `${(stats.present / students.length) * 100}%` }}
                                className="h-full bg-green-500 transition-all duration-500"
                            />
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-2">
                            Attendance Rate: {Math.round((stats.present / students.length) * 100)}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MarksTab = ({ classId, students, onSave }) => {
    const [marks, setMarks] = useState({});

    const handleMarkChange = (studentId, value) => {
        setMarks(prev => ({ ...prev, [studentId]: value }));
    };

    const handleSave = () => {
        onSave(classId, 'Internal-Assessment-1', marks);
        alert('Marks saved successfully!');
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Internal Marks Entry</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-100">Mid-Term Assessment</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-50 text-neutral-500 font-medium">
                        <tr>
                            <th className="p-3 rounded-l-lg">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3 text-right rounded-r-lg">Marks (Out of 50)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-neutral-50/50">
                                <td className="p-3 font-mono text-xs text-neutral-600">{student.id}</td>
                                <td className="p-3 font-medium text-neutral-800">{student.name}</td>
                                <td className="p-3 text-right">
                                    <input
                                        type="number"
                                        max="50"
                                        className="w-20 p-2 border border-neutral-200 rounded text-right focus:border-indigo-500 outline-none"
                                        placeholder="0"
                                        value={marks[student.id] || ''}
                                        onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                onClick={handleSave}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
                Submit Marks
            </button>
        </div>
    );
};

const TeacherClassDetail = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const {
        data,
        updateAttendance,
        updateMarks,
        postNotice
    } = useData();

    const [activeTab, setActiveTab] = useState('overview');
    const [attendanceDate, setAttendanceDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    // Find class data from user data or global lookups
    // Assuming user.id is a teacher, search their classes
    const teacherClasses = data.teacherData?.[user.id]?.classes || [];
    const selectedClass = teacherClasses.find(c => c.id === classId);

    // If not found, redirect (basic protection)
    if (!selectedClass) {
        return <div className="p-8 text-center">Class not found. <button onClick={() => navigate('/teacher')} className="text-blue-600">Go Back</button></div>;
    }

    // Mock Students (Deterministic based on class size)
    const selectedClassStudents = Array.from({ length: selectedClass.students }, (_, i) => ({
        id: `STU${selectedClass.id}${String(i + 1).padStart(3, '0')}`,
        name: `Student ${i + 1}`
    }));

    const renderOverview = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-2xl font-bold text-gray-800">{selectedClass.students}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                    <p className="text-sm text-gray-500">Schedule</p>
                    <p className="text-xl font-bold text-gray-800">{selectedClass.time}</p>
                </div>
            </div>
            {/* Recent Activity or Chart Preview */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Quick Attendance Overview</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer>
                        <AreaChart data={[
                            { day: 'Mon', present: Math.floor(selectedClass.students * 0.9) },
                            { day: 'Tue', present: Math.floor(selectedClass.students * 0.85) },
                            { day: 'Wed', present: Math.floor(selectedClass.students * 0.92) },
                            { day: 'Thu', present: Math.floor(selectedClass.students * 0.88) },
                            { day: 'Fri', present: Math.floor(selectedClass.students * 0.95) },
                        ]}>
                            <defs>
                                <linearGradient id="colorPresent2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Area type="monotone" dataKey="present" stroke="#4f46e5" fillOpacity={1} fill="url(#colorPresent2)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

    const renderNotices = () => {
        const classNotices = data.notices.filter(n => n.targetClasses.includes(selectedClass.id));
        return (
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Class Notices</h3>
                    <button onClick={() => navigate('/teacher/notices')} className="text-sm text-indigo-600 font-semibold hover:underline">Manage Notices</button>
                </div>
                <div className="space-y-4">
                    {classNotices.length === 0 ? <p className="text-gray-400 italic">No notices specifically for this class.</p> :
                        classNotices.map((n) => (
                            <div key={n.id} className="p-4 border border-neutral-100 rounded-xl bg-neutral-50">
                                <h4 className="font-bold text-gray-800">{n.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{n.content}</p>
                                <p className="text-xs text-gray-400 mt-2">{format(new Date(n.date), 'MMM dd, yyyy')}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                <button
                    onClick={() => navigate('/teacher')}
                    className="p-3 rounded-xl hover:bg-neutral-100 text-neutral-500 transition border border-transparent hover:border-neutral-200"
                >
                    <FaArrowLeft />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">{selectedClass.subject}</h1>
                    <div className="flex gap-3 text-sm text-neutral-500 mt-1">
                        <span className="flex items-center gap-1"><FaUsers className="text-xs" /> {selectedClass.name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><FaCalendarAlt className="text-xs" /> {selectedClass.time}</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white p-1.5 rounded-xl border border-neutral-200 w-fit shadow-sm overflow-x-auto">
                {['overview', 'attendance', 'marks', 'notices'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'attendance' && (
                    <AttendanceTab
                        classId={selectedClass.id}
                        date={attendanceDate}
                        setDate={setAttendanceDate}
                        initialData={data.attendanceRegisters?.[selectedClass.id]?.[attendanceDate]}
                        onSave={updateAttendance}
                        students={selectedClassStudents}
                    />
                )}
                {activeTab === 'marks' && (
                    <MarksTab
                        classId={selectedClass.id}
                        students={selectedClassStudents}
                        onSave={updateMarks}
                    />
                )}
                {activeTab === 'notices' && renderNotices()}
            </div>
        </div>
    );
};

export default TeacherClassDetail;
