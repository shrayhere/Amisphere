import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ProfileModal from '../../components/ProfileModal';
import { FaSearch, FaFilter, FaChalkboardTeacher } from 'react-icons/fa';

const HODTeachers = () => {
    const { data } = useData();
    const teachers = data.users.filter(u => u.role === 'teacher');
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Faculty Management</h1>
                    <p className="text-neutral-600">Total {teachers.length} faculty members in department</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search faculty..."
                            className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center gap-2 text-neutral-600">
                        <FaFilter size={14} /> Filter
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 font-medium">
                        + Add New
                    </button>
                </div>
            </div>

            {/* Teacher Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTeachers.map((teacher, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedTeacher(teacher)}
                        className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-start justify-between mb-4">
                            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-2xl font-bold overflow-hidden border-2 border-white shadow-sm">
                                {teacher.image ? (
                                    <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{teacher.name.charAt(0)}</span>
                                )}
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${teacher.designation?.includes('Senior')
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                {teacher.id}
                            </span>
                        </div>

                        <h3 className="font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors mb-1">
                            {teacher.name}
                        </h3>
                        <p className="text-sm text-neutral-500 mb-4">{teacher.designation}</p>

                        <div className="space-y-2 text-xs text-neutral-500">
                            <div className="flex items-center gap-2">
                                <FaChalkboardTeacher className="text-indigo-400" />
                                <span>{teacher.department} Department</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 text-center">📧</span>
                                <span className="truncate">{teacher.email}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between items-center">
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
                            <span className="text-xs text-neutral-400">View Profile →</span>
                        </div>
                    </div>
                ))}
            </div>

            <ProfileModal
                isOpen={!!selectedTeacher}
                onClose={() => setSelectedTeacher(null)}
                data={selectedTeacher}
            />
        </div>
    );
};

export default HODTeachers;
