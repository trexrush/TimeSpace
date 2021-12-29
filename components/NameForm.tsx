import axios from "axios"
import React, { useState } from "react"

const NameForm = () => {
    const [val, setVal] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post(`/api/users/username/trexrush3`, { val })
        .then(res => console.log(res), err => console.log(err))
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