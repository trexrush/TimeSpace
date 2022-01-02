import axios from "axios"
import React, { useState } from "react"

const TimeForm = ({ placeholder, userData, type, eventname }: any) => {
    const [val, setVal] = useState('')
    const [placeholderState, setPlaceholderState] = useState(placeholder)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(val, placeholder, userData)
        await axios.post("api/users/time/create", { val: val, userData: userData, type: type, eventname: eventname })
        .then(res => {
            console.log(res.data)
            setPlaceholderState(res.data)
            setVal("")
        })
    }

    return  <form onSubmit={handleSubmit}>
                <input
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder={placeholderState}>
                </input>
            </form>
}
export default TimeForm