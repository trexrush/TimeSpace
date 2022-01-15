import axios from "axios"
import React, { useState } from "react"

const SheetDataForm = (data: any) => {
    const [val, setVal] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post(`/api/users/integrations/update`, { val, data })
        // .then(res => console.log(data.data.wcaid), err => console.log(err))
    }

    return  <form onSubmit={handleSubmit}>
                <input
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder="change wcaid">
                </input>
            </form>
}
export default SheetDataForm