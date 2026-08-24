import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import NotificationPopup from '../../components/NotificationPopup';
import CGPAChart from '../../components/CGPAChart';
import AttendanceCircle from '../../components/AttendanceCircle';
import CalendarView from '../../components/CalendarView';
import ExamSchedule from '../../components/ExamSchedule';
import { FaBookOpen, FaCalendarCheck, FaMoneyBillWave, FaTrophy, FaChalkboardTeacher, FaSun } from 'react-icons/fa';

const StudentDashboard = () => {
    const { user } = useAuth();
    const { data } = useData();

    const studentData = data.studentData?.[user.id] || {};
    const attendance = studentData.attendance || {};
    const fees = studentData.fees || {};
    const exams = studentData.exams || {};
    const notifications = studentData.notifications || [];
    const facultyGuide = studentData.facultyGuide || {};
    const summerSemester = studentData.summerSemester || {};

    // Calculate overall attendance percentage
    const attendanceValues = Object.values(attendance);
    const totalPresent = attendanceValues.reduce((sum, s) => sum + s.present, 0);
    const totalClasses = attendanceValues.reduce((sum, s) => sum + s.total, 0);

    return (
        <div className="space-y-8 pb-10">
            {/* Notifications */}
            <NotificationPopup notifications={notifications} />

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome back, {user?.name.split(' ')[0]}!</h1>
                    <p className="text-neutral-600">Here's your academic overview for today.</p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-neutral-500">{studentData.course} | Sem {studentData.semester}</p>
                    <p className="text-xs text-neutral-400">ID: {user?.id}</p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-48">
                {/* CGPA Graph */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100 flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-neutral-500">CGPA Progression</span>
                        <div className="p-1.5 bg-yellow-50 rounded-lg text-yellow-600">
                            <FaTrophy size={10} />
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 -mx-4 -mb-4">
                        <CGPAChart data={exams.cgpaHistory} studentId={user.id} />
                    </div>
                </div>

                {/* Attendance Circular */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-100 h-full">
                    <AttendanceCircle present={totalPresent} total={totalClasses} />
                </div>

                <StatCard
                    title="Active Courses"
                    value={studentData.courses?.length || 0}
                    icon={FaBookOpen}
                    iconBgColor="bg-purple-100"
                    iconColor="text-purple-600"
                />
                <StatCard
                    title="Fees Status"
                    value={`₹${(fees.pending || 0) > 0 ? fees.pending + ' Due' : 'Cleared'}`}
                    icon={FaMoneyBillWave}
                    iconBgColor={fees.pending > 0 ? "bg-red-100" : "bg-green-100"}
                    iconColor={fees.pending > 0 ? "text-red-600" : "text-green-600"}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column (2/3) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Course Schedule / Timetable Preview */}
                    <CalendarView events={studentData.courses} />

                    {/* Examination Section */}
                    <ExamSchedule
                        exams={data.examSchedule || []}
                        isPublished={data.examPublished}
                    />
                </div>

                {/* Sidebar Column (1/3) */}
                <div className="space-y-8">

                    {/* Faculty Guide Card */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white text-center">
                        <div className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 text-2xl">
                            <FaChalkboardTeacher />
                        </div>
                        <h3 className="font-bold text-lg mb-1">Faculty Advisor</h3>
                        <p className="text-indigo-100 mb-6 text-sm">Reach out for academic guidance</p>

                        <div className="bg-white/10 rounded-xl p-4 text-left mb-4">
                            <p className="font-semibold text-sm">{facultyGuide.name || 'Not Assigned'}</p>
                            <p className="text-xs text-indigo-200 mt-1">{facultyGuide.email}</p>
                            <p className="text-xs text-indigo-200 mt-1">{facultyGuide.office}</p>
                        </div>
                        <button className="w-full py-2 bg-white text-indigo-600 font-semibold rounded-lg text-sm hover:bg-indigo-50 transition-colors">
                            Contact Advisor
                        </button>
                    </div>

                    {/* Fees Details */}
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                        <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
                            <FaMoneyBillWave className="text-green-600" /> Fee Structure
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Total Fees</span>
                                <span className="font-medium">₹{fees.total?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Paid Amount</span>
                                <span className="font-medium text-green-600">₹{fees.paid?.toLocaleString()}</span>
                            </div>
                            <div className="pt-3 border-t border-neutral-100 flex justify-between text-sm">
                                <span className="font-bold text-neutral-800">Due Amount</span>
                                <span className="font-bold text-red-600">₹{fees.pending?.toLocaleString()}</span>
                            </div>
                            {fees.pending > 0 && (
                                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg text-center mt-2">
                                    Due Date: <span className="font-bold">{fees.nextDueDate}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Summer Semester */}
                    <div className="bg-orange-50 rounded-2xl border border-orange-100 p-6">
                        <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                            <FaSun className="text-orange-500" /> Summer Semester
                        </h3>
                        {summerSemester.eligible ? (
                            <>
                                <p className="text-sm text-orange-700 mb-4">You are eligible for summer courses. Enhance your credits!</p>
                                <div className="space-y-2 mb-4">
                                    {summerSemester.coursesAvailable?.map((c, i) => (
                                        <div key={i} className="text-xs font-medium bg-white px-3 py-2 rounded border border-orange-100 text-orange-600">
                                            {c}
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg text-sm hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200">
                                    View Details & Apply
                                </button>
                            </>
                        ) : (
                            <p className="text-sm text-orange-400">Summer enrollment is currently closed.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
