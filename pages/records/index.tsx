import axios from "axios"
import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import EventCard from "../../components/EventCard"
import EventForm from "../../components/Forms/EventForm"
import Framework from "../../components/Framework"
import Logo from "../../assets/svg/Logo Small v2 White.svg"
import Image from "next/image"

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
                const resp = await axios(`api/users/records/${userData.username}`)
                setData(resp.data)
                setLoading(curr => !curr)
            }
        }
        fetchData()
    }, [userData])

    const removeEvent = () => {
        // console.log("remove event")
    }
    
    return (
        <Framework>
            { userData ?
                loading ? 
                    <div>Loading</div>
                :
                <>
                    <div className="flex flex-row justify-evenly items-center cursor-pointer">
                        <Link href="/" passHref>
                            <Image src={Logo} alt="home button" height={70} width={70}/>
                        </Link>
                        {/* spacers, ill fix this later maybe hopefully */}
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <Link href={`${router.pathname}/${userData.username}`} passHref>
                            <a className="text-sky-300 decoration-sky-300 hover:underline">
                                Public Url: {router.pathname}/{userData.username}
                            </a>
                        </Link>
                        
                    </div>
                    <div className="flex flex-wrap justify-center items-center">
                        {Object.keys(eventData).map((key) =>
                            <div key={key}>
                                <EventCard {...eventData[key]} eventname={key} userData={userData}></EventCard>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-center">
                        <EventForm userData={userData} eventData={eventData} setData={setData}/>
                    </div>
                </>
            :
                <div className="grid h-screen w-screen place-items-center">
                    <div className="text-center">
                        <div className="sm:text-4xl text-2xl">
                            Log in to manage your records <br/>
                        </div>
                        <Link href='/'>Back to Home</Link>
                    </div>
                </div>
            }
        </Framework>
    )
}
export default Records