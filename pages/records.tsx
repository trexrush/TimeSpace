import axios from "axios"
import { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import pbData from '../components/data.json'
import EventCard from "../components/EventCard"

const Records: NextPage = () => {
    const [userData, setUserData] = useState<any>()
    const [eventData, setData] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)
    const { data: session } = useSession()
  

  
    useEffect(() => { // loads the username of the user that the current session belongs to
        const loadUserData = async () => {
            const call = await axios("/api/users/data")
            .then(res => {
                setUserData(res.data[0])
                console.dir(userData)
        
            }, err => console.log(err))
            }
        loadUserData()
    }, [])

    useEffect(() => { // loads the data of the current user given the loaded data
        const fetchData = async () => {
            if(userData !== undefined) {
                console.log(userData)
                const resp = await axios(`api/users/events/${userData.username}`)
                setData(resp.data)
                setLoading(curr => !curr)
            }
        }
        fetchData()
    }, [userData])

    if(!loading) {
        console.dir(eventData)
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