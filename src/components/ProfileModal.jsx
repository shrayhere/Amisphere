import React from 'react';
import { FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChalkboardTeacher, FaUserGraduate, FaBook } from 'react-icons/fa';

const ProfileModal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    const isStudent = data.role === 'student';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-scale-in">

                {/* Header / Banner */}
                <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Profile Info */}
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6 flex justify-between items-end">
                        <div className="flex items-end gap-4">
                            <div className="w-32 h-32 bg-white rounded-full p-1 shadow-xl">
                                <div className="w-full h-full bg-neutral-100 rounded-full flex items-center justify-center text-4xl text-neutral-400 font-bold overflow-hidden">
                                    {data.image ? (
                                        <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{data.name?.charAt(0)}</span>
                                    )}
                                </div>
                            </div>
                            <div className="mb-1">
                                <h2 className="text-2xl font-bold text-neutral-900">{data.name}</h2>
                                <p className="text-indigo-600 font-medium">{data.designation || data.course}</p>
                            </div>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${isStudent ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                            {data.id}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Personal & Contact */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Contact Information</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-neutral-600">
                                        <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-indigo-500">
                                            <FaEnvelope size={14} />
                                        </div>
                                        <span className="text-sm">{data.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-neutral-600">
                                        <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-indigo-500">
                                            <FaPhone size={14} />
                                        </div>
                                        <span className="text-sm">+91 98765 43210</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-neutral-600">
                                        <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-indigo-500">
                                            <FaMapMarkerAlt size={14} />
                                        </div>
                                        <span className="text-sm">Campus Block A</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">
                                    {isStudent ? 'Academic Details' : 'Department Info'}
                                </h3>
                                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-neutral-400">Department</p>
                                            <p className="font-semibold text-neutral-800">{data.department || 'CSE'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-400">{isStudent ? 'Batch' : 'Joined'}</p>
                                            <p className="font-semibold text-neutral-800">{data.batch || '2020'}</p>
                                        </div>
                                        {isStudent && (
                                            <>
                                                <div>
                                                    <p className="text-xs text-neutral-400">Semester</p>
                                                    <p className="font-semibold text-neutral-800">{data.semester}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-400">CGPA</p>
                                                    <p className="font-semibold text-neutral-800">8.6</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Roles specific info */}
                        <div>
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">
                                {isStudent ? 'Enrolled Courses' : 'Assigned Subjects'}
                            </h3>
                            <div className="space-y-2">
                                {(data.subjects || data.courses || ['Data Structures', 'Algorithms', 'Database Systems']).map((sub, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-neutral-100 rounded-xl shadow-sm">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${isStudent ? 'bg-orange-400' : 'bg-indigo-500'
                                            }`}>
                                            <FaBook size={14} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-neutral-800">{typeof sub === 'string' ? sub : sub.name}</p>
                                            <p className="text-xs text-neutral-400">
                                                {isStudent ? '4 Credits' : 'Main Instructor'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end gap-3">
                        <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-neutral-500 hover:bg-neutral-50 transition-colors">
                            Close
                        </button>
                        <button className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors">
                            {isStudent ? 'View Full Report' : 'Send Message'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
