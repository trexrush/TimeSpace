import axios from "axios"
import { useState } from "react"
import TimeForm from "./TimeForm"

const Record = ({ name, eventname, time, userData, type }: any) => {

    return  <>
                <div>{name}:{' '}
                    {userData ?
                        <TimeForm placeholder={time} userData={userData} type={type} eventname={eventname}/> 
                        :
                        <span className="inline-block">{' '}{time}</span>
                    }
                </div>
            </>
}
export default Record