import axios from "axios"
import React, { useState } from "react"

const NameForm = (data: any) => {
    const [val, setVal] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post(`/api/users/username/${data.data.username}`, { val })
        .then(res => console.log(data.data.username), err => console.log(err))
    }

    return  <form onSubmit={handleSubmit}>
                <input
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder="create / modify username">
                </input>
            </form>
}
export default NameForm