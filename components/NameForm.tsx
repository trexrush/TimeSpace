import axios from "axios"
import React, { useState } from "react"

const NameForm = (data: any) => {
    const [val, setVal] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await axios.post(`/api/users/records/add`, { val, data }) // in profile use `/api/users/username/${data.data.actid}`, in first account creation use `/api/users/records/add`
        .then(res => alert(res.data.message), err => console.log(err))
    }

    return  <form onSubmit={handleSubmit}>
                <input
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder="Create a Username"
                className="text-4xl bg-transparent outline-none decoration-[rgba(255,255,255,.6)] focus:bg-[rgba(255,255,255,.1)] hover:underline rounded-[7px] text-center">
                </input>
            </form>
}
export default NameForm