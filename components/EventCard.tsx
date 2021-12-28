import eventName from "./eventName"

const exists = (data:Number): Boolean => {
    return (data !== null && data !== undefined)
}

const EventCard = (props:any) => {
    return  <div className="flex flex-col">
                {/* no non-wca support yet */}
                <div>{eventName[props.eventName]}</div>
                {/* single */ exists(props.single) && <div>Single:{' '}{props.single}</div>}
                {/* mean of 3 */ exists(props.mo_3) && <div>Mo3:{' '}{props.mo_3}</div>}
                {/* average of 5 */ exists(props.ao_5) && <div>Ao5:{' '}{props.ao_5}</div>}
                {/* average of 12 */ exists(props.ao_12) && <div>Ao12:{' '}{props.ao_12}</div>}
                {/* average of 25 */ exists(props.ao_25) && <div>Ao25:{' '}{props.ao_25}</div>}
                {/* average of 50 */ exists(props.ao_50) && <div>Ao50:{' '}{props.ao_50}</div>}
                {/* average of 100 */ exists(props.ao_100) && <div>Ao100:{' '}{props.ao_100}</div>}
                {/* wca single */ props.wca && <div>Official Single:{' '}{props.WCAsingle / 100 || "None"}</div>}
                {/* wca average */ props.wca && <div>Official Average:{' '}{props.WCAaverage / 100 || "None"}</div>}
            </div>
}
export default EventCard