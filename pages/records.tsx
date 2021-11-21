import { Container, Grid, Paper } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import pbData from '../components/data.json'
import styles from '../styles/Home.module.sass'

interface IEvent {
    event: String,
    WCAsingle?: number,
    WCAaverage?: number,
    single?: number,
    average?: any[]
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
            const wcaRes = await axios('https://www.worldcubeassociation.org/api/v0/persons/2013mazu02')
            let WCAevents = wcaRes.data.personal_records
            let temp = {}
            for (let key in WCAevents) {
                if (pbData.hasOwnProperty(key)) {
                    let curr: IEvent = {
                        event: key,
                        WCAsingle: WCAevents[key].single.best,
                        WCAaverage: WCAevents[key].average.best,
                        single: pbData[key].single,
                        average: pbData[key].averages
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
        console.log(loading)
    })
    if(!loading) {
        console.log(eventData)
    }
    
    return (
        <Container>
            {loading ? (<div>Loading</div>) : 
                (<Grid container spacing={.5}>
                    <Grid item xs={3} className={styles.card}>
                        <div>{translation[eventData['333'].event]}</div>
                        <div>Single:{' '}{eventData['333'].single}</div>
                        <div>Ao5:{' '}{eventData['333'].average[1]}</div>
                        <div>Ao12:{' '}{eventData['333'].average[2]}</div>
                        <div>Ao25:{' '}{eventData['333'].average[3]}</div>
                        <div>Ao50:{' '}{eventData['333'].average[4]}</div>
                        <div>Ao100:{' '}{eventData['333'].average[5]}</div>
                        <div>Official Single:{' '}{eventData['333'].WCAsingle / 100}</div>
                        <div>Official Average:{' '}{eventData['333'].WCAaverage / 100}</div>
                    </Grid>
                </Grid>)}
            {/* </Paper> */}
        </Container>
    )
}
export default Records