import axios from "axios"
import React, { useState } from "react"

const EventForm = ({ placeholder, userName }: any) => {
    const [val, setVal] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(val, placeholder, userName)
        await axios.post("api/users/records/event/create", { eventName: val, username: userName })
        .then(res => console.log(res.data))
    }

    return  <form onSubmit={handleSubmit}>
                <input
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder={placeholder}>
                </input>
            </form>
}
export default EventForm