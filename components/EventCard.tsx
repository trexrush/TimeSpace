

const translation: any = {
    "222": "2x2",
    "333": "3x3",
    "444": "4x4",
    "555": "5x5",
    "666": "6x6",
    "777": "7x7",
    "333bf": "3BLD",
    "333fm": "Fewest Moves",
    "333ft": "Feet",
    "333mbf": "Multi BLD",
    "333mbo": "Multi BLD Old Style",
    "333oh": "One-Handed",
    "444bf": "4BLD",
    "555bf": "5BLD",
    "clock": "Rubiks Clock",
    "magic": "Rubiks Magic",
    "minx": "Megaminx",
    "mmagic": "Master Magic",
    "pyram": "Pyraminx",
    "skewb": "Skewb",
    "sq1": "Square-1",
}

const EventCard = (key: any, eventData: any) => {
    console.log(eventData)
    return  <div key={key} className="eventCard flex flex-col">
                <div className="record">{eventData[key].wca ? translation[eventData[key].event] : eventData[key].event}</div>
                {/* single */ eventData[key].single != -1 && <div className="record">Single:{' '}{eventData[key].single}</div>}
                {/* mean of 3 */ eventData[key].average[0] != -1 && <div className="record">Mo3:{' '}{eventData[key].average[0]}</div>}
                {/* average of 5 */ eventData[key].average[1] != -1 && <div className="record">Ao5:{' '}{eventData[key].average[1]}</div>}
                {/* average of 12 */ eventData[key].average[2] != -1 && <div className="record">Ao12:{' '}{eventData[key].average[2]}</div>}
                {/* average of 25 */ eventData[key].average[3] != -1 && <div className="record">Ao25:{' '}{eventData[key].average[3]}</div>}
                {/* average of 50 */ eventData[key].average[4] != -1 && <div className="record">Ao50:{' '}{eventData[key].average[4]}</div>}
                {/* average of 100 */ eventData[key].average[5] != -1 && <div className="record">Ao100:{' '}{eventData[key].average[5]}</div>}
                {/* wca single */ eventData[key].wca && <div className="record">Official Single:{' '}{eventData[key].WCAsingle / 100 || "None"}</div>}
                {/* wca average */ eventData[key].wca && <div className="record">Official Average:{' '}{eventData[key].WCAaverage / 100 || "None"}</div>}
            </div>
}
export default EventCard