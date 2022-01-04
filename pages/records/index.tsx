import axios from "axios"
import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import EventCard from "../../components/EventCard"
import EventForm from "../../components/EventForm"
import Framework from "../../components/Framework"

const Records: NextPage = () => {
    const [userData, setUserData] = useState<any>()
    const [eventData, setData] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)
    const { data: session } = useSession()
    const router = useRouter()
  
    useEffect(() => { // loads the username of the user that the current session belongs to
        const loadUserData = async () => {
            const call = await axios("/api/users/data")
            .then(res => {
                setUserData(res.data[0])
            }, err => console.log(err))
            }
        loadUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => { // loads the data of the current user given the loaded data
        const fetchData = async () => {
            if(userData !== undefined) {
                console.dir(userData)
                const resp = await axios(`api/users/records/${userData.username}`)
                setData(resp.data)
                setLoading(curr => !curr)
            }
        }
        fetchData()
    }, [userData])

    useEffect(() => { // once loaded, console logs the event Data (DEV)
        if(!loading) {
            console.dir(eventData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    // const removeEvent = () => {
    //     console.log("remove event")
    // }
    
    return (
        <Framework>
            {loading ? (
                <div>Loading</div>
            ) : (
                <>
                    <Link href={`${router.pathname}/${userData.username}`} passHref>
                        <a style={{color: "skyblue"}}>
                            Public Url: {router.pathname}/{userData.username}
                        </a>
                    </Link>
                    <div>
                        {Object.keys(eventData).map((key) =>
                            <div key={key}>
                                <br/>
                                {eventData[key] && <EventCard {...eventData[key]} eventname={key} userData={userData}></EventCard>}
                            </div>
                        )}
                    </div>
                    <EventForm placeholder="[+NewEvent]" userData={userData} eventData={eventData} setData={setData}/>
                    <br/>
                    <Link href="/" passHref>
                        <a style={{color: "skyblue"}}>
                            Back
                        </a>
                    </Link>
                </>
            )}
        </Framework>
    )
}
export default Records