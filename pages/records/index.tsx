import axios from "axios"
import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import EventCard from "../../components/EventCard"

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
                console.log(userData)
                const resp = await axios(`api/users/records/${userData.username}`)
                setData(resp.data)
                setLoading(curr => !curr)
            }
        }
        fetchData()
    }, [userData])

    useEffect(() => {
        if(!loading) {
            console.dir(eventData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const addEvent = async () => {
        console.log("gonna add an event")
    }

    const removeEvent = () => {
        console.log("remove event")
    }
    
    return (
        <div className="min-h-screen w-full">
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
                            <>
                                <button style={{color: "red"}} onClick={removeEvent}>[-]</button>
                                {eventData[key] && <EventCard key={key} {...eventData[key]}></EventCard>}
                            </>
                        )}
                    </div>
                    <button style={{color: "lime"}} onClick={addEvent}>
                            [+]
                    </button>
                    <br/>
                    <Link href="/" passHref>
                        <a style={{color: "skyblue"}}>
                            Back
                        </a>
                    </Link>
                </>
            )}
        </div>
    )
}
export default Records