import { Grid, CircularProgress } from "@mui/material"
import axios from "axios"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import pbData from '../components/data.json'

//import wcaRes from '../components/WCAdata.json'

interface IEvent {
    event: String,
    wca: Boolean
    WCAsingle?: number,
    WCAaverage?: number,
    single?: number,
    average: any[]
}

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

const Records: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [eventData, setData] = useState<any>({})
    useEffect(() => {
        const fetchData = async () => {
            const wcaRes = await axios('https://www.worldcubeassociation.org/api/v0/persons/2013mazu02')
            let WCAevents = wcaRes.data.personal_records
            //let WCAevents: any = wcaRes.personal_records
            let temp: any = {}
            for (let key in WCAevents) {
                if (pbData.hasOwnProperty(key)) {
                    let curr: IEvent = {
                        event: key,
                        wca: true,
                        WCAsingle: WCAevents[key].single.best,
                        WCAaverage: WCAevents[key].average.best,
                        single: pbData[key].single,
                        average: pbData[key].averages
                    }
                    temp[key] = curr
                }
            }
            for (let key in pbData) {
                if (!temp.hasOwnProperty(key)) {
                    let curr: IEvent = {
                        event: key,
                        single: pbData[key].single,
                        average: pbData[key].averages,
                        wca: pbData[key].wca
                    }
                    temp[key] = curr
                }
            }
            setData(temp)
            setLoading(curr => !curr)
        }
        fetchData()
    }, [])

    if(!loading) {
        console.log(eventData)
    }
    
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            {loading ? (
                <CircularProgress/>
            ) : 
                (<Grid container spacing={1}>
                    {Object.keys(eventData).map((key) =>
                        <div key={key} className="eventCard flex flex-col">
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
                   )}
                </Grid>
            )}
        </div>
    )
}
export default Records