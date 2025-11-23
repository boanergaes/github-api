export default function MessagePanel() {
    return (
        <div className="border border-gray-600 h-184">
            <div className="flex gap-6 cursor-pointer overflow-x-scroll">
                <div className="text-nowrap">#front-end</div>
                <div className="text-nowrap">#back-end</div>
                <div className="text-nowrap">#core-team</div>
                <div className="text-nowrap">#contributors</div>
                <div className="text-nowrap">#front-end</div>
                <div className="text-nowrap">#back-end</div>
                <div className="text-nowrap">#core-team</div>
                <div className="text-nowrap">#contributors</div>
            </div>
            <div className="flex flex-col justify-end">
                <div></div>
            </div>
        </div>
    )
}