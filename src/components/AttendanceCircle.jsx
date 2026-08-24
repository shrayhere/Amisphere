import React from 'react';

const AttendanceCircle = ({ present, total, thresholdSafe = 85, thresholdWarn = 75 }) => {
    // 1. Calculate Percentage
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    // 2. Logic for 3-level indicators (Green > 85%, Yellow 75-84%, Red < 75%)
    let status = 'At Risk';
    let statusColor = 'text-red-500';
    let statusBg = 'bg-red-50';
    let strokeColor = '#ef4444'; // red-500
    let trailColor = '#fee2e2'; // red-100

    if (percentage >= thresholdSafe) {
        status = 'Safe';
        statusColor = 'text-green-600';
        statusBg = 'bg-green-50';
        strokeColor = '#16a34a'; // green-600
        trailColor = '#dcfce7'; // green-100
    } else if (percentage >= thresholdWarn) {
        status = 'Borderline';
        statusColor = 'text-yellow-600';
        statusBg = 'bg-yellow-50';
        strokeColor = '#ca8a04'; // yellow-600
        trailColor = '#fef9c3'; // yellow-100
    }

    // 3. Predictive Logic / Dynamic Alert
    // Formula derived:
    // To drop below 75%: (Present) / (Total + X) < 0.75  =>  X > (Present/0.75 - Total)
    // To reach 75%: (Present + Y) / (Total + Y) >= 0.75  =>  0.25Y >= 0.75*Total - Present  => Y >= (0.75*Total - Present) / 0.25

    const classesCanMiss = Math.floor(present / 0.75 - total);
    const classesToRecover = Math.ceil((0.75 * total - present) / 0.25);

    let alertMessage = "";
    if (percentage >= 75) {
        // Safe zone (Green or Yellow)
        if (classesCanMiss > 0) {
            alertMessage = `If you miss ${classesCanMiss + 1} more classes, you will be debarred.`;
            // wording: "miss X more classes" -> implies the X-th class causes the drop? 
            // if classesCanMiss is 2, missing 1 is safe, missing 2 is safe (borderline), missing 3 is unsafe.
            // Let's stick to "You can safely miss X classes." or user phrasing: "If you miss X classes..."
            // "If you miss ${classesCanMiss + 1} classes..." triggers the debar.
        } else {
            alertMessage = "You cannot miss any more classes.";
        }
    } else {
        // Red zone
        const noun = classesToRecover === 1 ? 'class' : 'classes';
        alertMessage = `Attend next ${classesToRecover} ${noun} to avoid debarring.`;
    }


    // SVG Circle Props
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className={`p-4 rounded-xl ${statusBg} border border-opacity-50 flex flex-col items-center justify-center relative overflow-hidden h-full shadow-sm`}>

            <div className="flex w-full items-center gap-4">
                {/* 1. Circular Visualization */}
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background Trail */}
                        <circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke={trailColor}
                            strokeWidth="8"
                            fill="transparent"
                        />
                        {/* Progress Indicator */}
                        <circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke={strokeColor}
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-xl font-bold ${statusColor}`}>
                            {percentage}%
                        </span>
                    </div>
                </div>

                {/* 2. Text Details */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-1">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white bg-opacity-60 border border-white/50 ${statusColor}`}>
                            {status}
                        </span>
                    </div>

                    <p className="text-xs font-semibold text-neutral-700 mb-1">
                        {present} <span className="text-neutral-400 font-normal">/</span> {total} Attended
                    </p>

                    <div className={`text-[10px] font-medium leading-tight p-2 rounded bg-white bg-opacity-60 border border-white/50 shadow-sm ${statusColor}`}>
                        {alertMessage}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCircle;
