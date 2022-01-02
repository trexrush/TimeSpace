import axios from "axios"
import { useState } from "react"
import TimeForm from "./TimeForm"

const Record = ({ name, eventname, time, userData, type }: any) => {

    const removeTime = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("delete record")
    }
    return  <>
                <div>{name}:{' '}
                    {userData ?
                        <TimeForm placeholder={time} userData={userData} type={type} eventname={eventname}/> 
                        :
                        <div className="inline-block">{' '}{time}</div>
                    }
                </div>
            </>
}
export default Record