import EventForm from "./EventForm"
import eventName from "./eventName"
import Record from "./Record"
import "@cubing/icons"

const exists = (data:Number): Boolean => {
    return (data !== null && data !== undefined)
}


const EventCard = (props:any) => {
    return  <>
                {props.userData ? <>
                    <div className="flex flex-col">
                        {/* no non-wca support yet */}
                        <div>{eventName[props.eventName]}
                            {/* only if wca */}
                            <span className={`cubing-icon event-${props.eventName}`}></span>
                        </div>
                        {/* single */ <Record name="Single" time={props.single} userData={props.userData} type={"single"} eventname={props.eventName}/>}
                        {/* mean of 3 */ <Record name="Mo3" time={props.mo_3} userData={props.userData}  type={"mo_3"}  eventname={props.eventName}/>}
                        {/* average of 5 */ <Record name="Ao5" time={props.ao_5} userData={props.userData}  type={"ao_5"}  eventname={props.eventName}/>}
                        {/* average of 12 */ <Record name="Ao12" time={props.ao_12} userData={props.userData} type={"ao_12"}  eventname={props.eventName}/>}
                        {/* average of 25 */ <Record name="Ao25" time={props.ao_25} userData={props.userData} type={"ao_25"}  eventname={props.eventName}/>}
                        {/* average of 50 */ <Record name="Ao50" time={props.ao_50} userData={props.userData} type={"ao_50"}  eventname={props.eventName}/>}
                        {/* average of 100 */ <Record name="Ao100" time={props.ao_100} userData={props.userData} type={"ao_100"}  eventname={props.eventName}/>}
                        {/* wca single */ props.wca && <div>Official Single:{' '}{props.WCAsingle / 100 || "None"}</div>}
                        {/* wca average */ props.wca && <div>Official Average:{' '}{props.WCAaverage / 100 || "None"}</div>}
                    </div>
                </> : 
                    <div className="flex flex-col">
                        {/* no non-wca support yet */}
                        <div>{eventName[props.eventName]}</div>
                        {/* single */ exists(props.single) && <Record name="Single" time={props.single}/>}
                        {/* mean of 3 */ exists(props.mo_3) && <Record name="Mo3" time={props.mo_3}/>}
                        {/* average of 5 */ exists(props.ao_5) && <Record name="Ao5" time={props.ao_5}/>}
                        {/* average of 12 */ exists(props.ao_12) && <Record name="Ao12" time={props.ao_12}/>}
                        {/* average of 25 */ exists(props.ao_25) && <Record name="Ao25" time={props.ao_25}/>}
                        {/* average of 50 */ exists(props.ao_50) && <Record name="Ao50" time={props.ao_50}/>}
                        {/* average of 100 */ exists(props.ao_100) && <Record name="Ao100" time={props.ao_100}/>}
                        {/* wca single */ props.wca && <div>Official Single:{' '}{props.WCAsingle / 100 || "None"}</div>}
                        {/* wca average */ props.wca && <div>Official Average:{' '}{props.WCAaverage / 100 || "None"}</div>}
                    </div>}
            </>
}
export default EventCard