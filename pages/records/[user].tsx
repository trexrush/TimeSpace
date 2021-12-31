import axios from "axios"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import EventCard from "../../components/EventCard"

const RecordsPublic: NextPage = ({urlPath}: any) => {
    const [eventData, setData] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => { // loads the data of the current user given the url
        if (!urlPath) {
            return
        }
        const fetchData = async () => {
            const resp = await axios(`/api/users/records/${urlPath}`)
            setData(resp.data)
            setLoading(curr => !curr)
        }
        fetchData()
    }, [urlPath])

    if(!loading) {
        console.dir(eventData)
    }
    
    return (
        <div className="min-h-screen w-full">
            {loading ? (
                <div>Loading</div>
            ) : (
                <div>
                    {Object.keys(eventData).map((key) =>
                        eventData[key] && <EventCard key={key} {...eventData[key]}></EventCard>
                   )}
                </div>
            )}
        </div>
    )
}

export const getServerSideProps = async (context: any) => {
    const { user } = context.params
    return {
        props: {
            urlPath: user
        }, // name of last pathname
    }
}

export default RecordsPublic