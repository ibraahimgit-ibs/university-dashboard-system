
const Card = ({ title, icon, icon2, numbers, paragraph, div }) => {
    return (
        <div className="border border-gray-300 rounded-xl h-full w-full flex flex-col gap-6 p-4 px-6 hover:shadow-md transition">
            <div className="flex items-center justify-between p-1">
                <h2 className="font-semibold">{title}</h2>
                <div className="text-gray-500">{icon}</div>
            </div>
            <div className="pl-1">
                <h1 className="font-bold text-2xl">{numbers}</h1>
                <span className="isdarkCard flex items-center gap-2 text-[13px] text-gray-500">{icon2}{paragraph}</span>
                <div className="">{div}</div>
            </div>
        </div>
    )
}

export default Card;