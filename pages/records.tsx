import axios from "axios"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import pbData from '../components/data.json'
import EventCard from "../components/EventCard"

const Records: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [eventData, setData] = useState<any>({})
    useEffect(() => {
        const fetchData = async () => {
            const resp = await axios('api/users/trexrush/events')
            setData(resp.data)
            setLoading(curr => !curr)
        }
        fetchData()
    }, [])

    if(!loading) {
        console.log(eventData)
    }
    
    return (
        <div className="min-h-screen w-full">
            {loading ? (
                <div>Loading</div>
            ) : 
                (<div>
                    {Object.keys(eventData).map((key) =>
                        eventData[key] && <EventCard key={key} {...eventData[key]}></EventCard>
                   )}
                </div>
            )}
        </div>
    )
}
export default Records