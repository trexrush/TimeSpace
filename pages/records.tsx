import { Container, Grid, Paper, CircularProgress, Box } from "@mui/material"
// import axios from "axios"
import { useEffect, useState } from "react"
import pbData from '../components/data.json'

import wcaRes from '../components/WCAdata.json'

interface IEvent {
    event: String,
    wca: Boolean
    WCAsingle?: number,
    WCAaverage?: number,
    single?: number,
    average: any[]
}

const translation = {
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

const Records: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [eventData, setData] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            // const wcaRes = await axios('https://www.worldcubeassociation.org/api/v0/persons/2013mazu02')
            // let WCAevents = wcaRes.data.personal_records
            let WCAevents = wcaRes.personal_records
            let temp = {}
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

    useEffect(() => {
        // console.log(loading)
    })
    if(!loading) {
        console.log(eventData)
    }
    
    return (
        <Container className="flex justify-center items-center min-h-screen">
            {loading ? (
                <CircularProgress/>
            ) : 
                (<Grid container spacing={1}>
                    {Object.keys(eventData).map((key) =>
                        // vvv it be like this sometimes vvv
                        // eslint-disable-next-line react/jsx-key
                        <Grid item xs={5} className="eventCard flex flex-col">
                            <div className="">{eventData[key].wca ? translation[eventData[key].event] : eventData[key].event}</div>
                            {eventData[key].single != -1 ? <div>Single:{' '}{eventData[key].single}</div> : null}
                            {eventData[key].average[0] != -1 ? <div>Mo3:{' '}{eventData[key].average[0]}</div> : null}
                            {eventData[key].average[1] != -1 ? <div>Ao5:{' '}{eventData[key].average[1]}</div> : null}
                            {eventData[key].average[2] != -1 ? <div>Ao12:{' '}{eventData[key].average[2]}</div> : null}
                            {eventData[key].average[3] != -1 ? <div>Ao25:{' '}{eventData[key].average[3]}</div> : null}
                            {eventData[key].average[4] != -1 ? <div>Ao50:{' '}{eventData[key].average[4]}</div> : null}
                            {eventData[key].average[5] != -1 ? <div>Ao100:{' '}{eventData[key].average[5]}</div> : null}
                            {eventData[key].wca ? <div>Official Single:{' '}{eventData[key].WCAsingle / 100 || "None"}</div> : null}
                            {eventData[key].wca ? <div>Official Average:{' '}{eventData[key].WCAaverage / 100 || "None"}</div> : null}
                        </Grid>
                   )}
                </Grid>
            )}
        </Container>
    )
}
export default Records