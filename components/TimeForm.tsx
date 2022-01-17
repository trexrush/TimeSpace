import axios from "axios"
import React, { useState } from "react"

const TimeForm = ({ placeholder, userData, type, eventname }: any) => {
    const [val, setVal] = useState('')
    const [placeholderState, setPlaceholderState] = useState(placeholder)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post("api/users/time/create", { val: val, userData: userData, type: type, eventname: eventname })
        .then(res => {
            setPlaceholderState(res.data)
            setVal("")
        })
    }

    return  <form onSubmit={handleSubmit} className="inline w-auto absolute m-0">
                    <input
                    className="cursor-pointer p-2 bg-transparent focus:bg-[rgba(255,255,255,.1)] decoration-[rgba(255,255,255,.5)] rounded-lg hover:underline outline-none w-[120px] text-2xl h-7"
                    type="text"
                    value={val}
                    onChange={e => setVal(e.target.value)}
                    placeholder={placeholderState ? placeholderState : "none"}>
                    </input>   
            </form>
}
export default TimeForm