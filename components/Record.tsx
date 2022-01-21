import axios from "axios"
import { useState } from "react"
import TimeForm from "./Forms/TimeForm"

const Record = ({ name, eventname, time, userData, type, format }: any) => {

    return  <>
                <div>{name}:{' '}
                    {userData ?
                        <TimeForm placeholder={time} userData={userData} type={type} eventname={eventname} format={format}/> 
                        :
                        <span className="inline-block">{' '}{time}{/* {format(time)} */}</span>
                    }
                </div>
            </>
}
export default Record