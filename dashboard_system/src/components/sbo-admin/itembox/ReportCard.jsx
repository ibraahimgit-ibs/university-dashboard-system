import React from "react";

const ReportCard = ( { title, description, icon, clicked } ) => {
    return (
        <div
            onClick={clicked}
            className="flex items-center justify-start gap-3 border border-gray-300 rounded-xl p-5 my-1.5 hover:shadow-lg transition-shadow duration-300"
        >
            <div className="darkDiv p-2 h-10 bg-gray-200 rounded-md">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default ReportCard;
