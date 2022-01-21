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
                className="bg-transparent outline-none hover:underline decoration-[rgba(255,255,255,.3)] focus:bg-[rgba(255,255,255,.1)] rounded-[9px] w-[140px] mt-3"
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder="change WCA id">
                </input>
            </form>
}
export default SheetDataForm