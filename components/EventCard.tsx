import eventName from "./eventName"

const exists = (data:Number): Boolean => {
    return data !== null
}

const EventCard = (props:any, { key }:any) => {
    console.log(key)
    console.log(props.single)
    return  <div key={key} className="eventCard flex flex-col">
                {/* no non-wca support yet */}
                <div className="record">{eventName[props.eventName]}</div>
                {/* single */ exists(props.single) && <div className="record">Single:{' '}{props.single}</div>}
                {/* mean of 3 */ exists(props.mo_3) && <div className="record">Mo3:{' '}{props.mo_3}</div>}
                {/* average of 5 */ exists(props.ao_5) && <div className="record">Ao5:{' '}{props.ao_5}</div>}
                {/* average of 12 */ exists(props.ao_12) && <div className="record">Ao12:{' '}{props.ao_12}</div>}
                {/* average of 25 */ exists(props.ao_25) && <div className="record">Ao25:{' '}{props.ao_25}</div>}
                {/* average of 50 */ exists(props.ao_50) && <div className="record">Ao50:{' '}{props.ao_50}</div>}
                {/* average of 100 */ exists(props.ao_100) && <div className="record">Ao100:{' '}{props.ao_100}</div>}
                {/* wca single */ props.wca && <div className="record">Official Single:{' '}{props.WCAsingle / 100 || "None"}</div>}
                {/* wca average */ props.wca && <div className="record">Official Average:{' '}{props.WCAaverage / 100 || "None"}</div>}
            </div>
}
export default EventCard