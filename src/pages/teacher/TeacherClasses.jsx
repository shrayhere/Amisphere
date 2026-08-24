import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaArrowRight } from 'react-icons/fa';

const TeacherClasses = () => {
    const { user } = useAuth();
    const { data } = useData();
    const navigate = useNavigate();

    const teacherData = data.teacherData?.[user.id] || {};
    const classes = teacherData.classes || [];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-neutral-900">My Classes</h1>
            <p className="text-neutral-600">Overview of your assigned classes and subjects.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.length > 0 ? (
                    classes.map((cls) => (
                        <div
                            key={cls.id}
                            onClick={() => navigate(`/teacher/classes/${cls.id}`)}
                            className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition">
                                    <FaUsers className="text-xl" />
                                </div>
                                <span className="text-xs font-bold px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">{cls.time}</span>
                            </div>

                            <h3 className="text-lg font-bold text-neutral-900 mb-1">{cls.subject}</h3>
                            <p className="text-neutral-500 text-sm mb-4">{cls.name}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                                <span className="text-sm font-medium text-neutral-600">{cls.students} Students</span>
                                <FaArrowRight className="text-indigo-400 group-hover:translate-x-1 transition" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-12 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
                        <p className="text-neutral-500">No classes assigned.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherClasses;
