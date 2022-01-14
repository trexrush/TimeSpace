import EventForm from "./EventForm"
import eventName from "./eventName"
import Record from "./Record"
import "@cubing/icons"

const exists = (data:Number): Boolean => {
    return (data !== null && data !== undefined)
}


const EventCard = (props:any) => {
    const recordData = {
        userData: props.userData,
        eventname: props.eventName
    }
    return  <div className="flex flex-col m-8">
                {props.userData ? 
                <>
                    {/* no non-wca support yet */}
                    <div className="text-5xl">
                        {/* only if wca */}
                        <span className={`cubing-icon event-${props.eventName}`}></span>
                        {' '}{eventName[props.eventName]}
                    </div>
                    <div className=" flex flex-col justify-center border-[6px] border-white border-solid h-[370px] w-card rounded-lg text-[32px] relative pl-2">
                        <div className="leading-none absolute top-6">
                            <Record name="Single" time={props.single} type={"single"} {...recordData}/>
                        </div>
                        <div className="leading-none absolute top-16">
                            <Record name="Mo3" time={props.mo_3} type={"mo_3"} {...recordData}/>
                            <Record name="Ao5" time={props.ao_5} type={"ao_5"} {...recordData}/>
                            <Record name="Ao12" time={props.ao_12} type={"ao_12"} {...recordData}/>
                            <Record name="Ao25" time={props.ao_25} type={"ao_25"} {...recordData}/>
                            <Record name="Ao50" time={props.ao_50} type={"ao_50"} {...recordData}/>
                            <Record name="Ao100" time={props.ao_100} type={"ao_100"} {...recordData}/>
                        </div>
                        <div className="leading-none absolute top-60">
                            {props.wca && <div>WCA single:{' '}{props.WCAsingle / 100 || "None"}</div>}
                            {props.wca && <div>WCA average:{' '}{props.WCAaverage / 100 || "None"}</div>}
                        </div>
                        <div className="absolute h-[92%] right-2 w-[135px] flex flex-col border-2 rounded-md">
                            Notes<br/>{props.notes}
                        </div>
                    </div>
                </> : (exists(props.mo_3) || exists(props.ao_5) || exists(props.ao_12) || exists(props.ao_25) || exists(props.ao_50) || exists(props.ao_100) || exists(props.single)) &&
                <>
                    {/* no non-wca support yet */}
                    <div className="text-5xl">
                        {/* only if wca */}
                        <span className={`cubing-icon event-${props.eventName}`}></span>
                        {' '}{eventName[props.eventName]}
                    </div>
                    <div className=" flex flex-col justify-center border-[6px] border-white border-solid h-[370px] w-card rounded-lg text-[32px] relative pl-2">
                        <div className="leading-none absolute top-6">
                            {exists(props.single) && <Record name="single" time={props.single}/>}
                        </div>
                        <div className="leading-none absolute top-16">
                            {exists(props.mo_3) && <Record name="mean of 3" time={props.mo_3}/>}
                            {exists(props.ao_5) && <Record name="average of 5" time={props.ao_5}/>}
                            {exists(props.ao_12) && <Record name="average of 12" time={props.ao_12}/>}
                            {exists(props.ao_25) && <Record name="average of 25" time={props.ao_25}/>}
                            {exists(props.ao_50) && <Record name="average of 50" time={props.ao_50}/>}
                            {exists(props.ao_100) && <Record name="average of 100" time={props.ao_100}/>}
                        </div>
                        <div className="leading-none absolute top-60">
                            {props.wca && <div>WCA single:{' '}{props.WCAsingle / 100 || "None"}</div>}
                            {props.wca && <div>WCA average:{' '}{props.WCAaverage / 100 || "None"}</div>}
                        </div>
                        <div className="absolute h-[92%] right-2 w-[135px] flex flex-col border-2 rounded-md">
                            Notes<br/>{props.notes}
                        </div>
                    </div>
                </>}
            </div>
}
export default EventCard