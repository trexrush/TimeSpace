import { Listbox } from "@headlessui/react"
import axios from "axios"
import React, { useState, Fragment } from "react"

// const eventoptions = [
//     { id: 1, submit: "333", name: "3x3" },
//     { id: 2, submit: "222", name: "2x2" },
//     { id: 3, submit: "333", name: "3x3" },
//     { id: 4, submit: "444", name: "4x4" },
//     { id: 5, submit: "555", name: "5x5" },
//     { id: 6, submit: "666", name: "6x6" },
//     { id: 7, submit: "777", name: "7x7" },
//     { id: 8, submit: "333bf", name: "3BLD" },
//     { id: 9, submit: "333fm", name: "Fewest Moves" },
//     { id: 10, submit: "333ft", name: "Feet" },
//     { id: 11, submit: "333mbf", name: "Multi BLD" },
//     { id: 12, submit: "333mbo", name: "Multi BLD Old Style" },
//     { id: 13, submit: "333oh", name: "One-Handed" },
//     { id: 14, submit: "444bf", name: "4BLD" },
//     { id: 15, submit: "555bf", name: "5BLD" },
//     { id: 16, submit: "clock", name: "Rubiks Clock" },
//     { id: 17, submit: "magic", name: "Rubiks Magic" },
//     { id: 18, submit: "minx", name: "Megaminx" },
//     { id: 19, submit: "mmagic", name: "Master Magic" },
//     { id: 20, submit: "pyram", name: "Pyraminx" },
//     { id: 21, submit: "skewb", name: "Skewb" },
//     { id: 22, submit: "sq1", name: "Square-1" }
// ]

const EventForm = ({ placeholder, userData, eventData, setData }: any) => {
    // const [val, setVal] = useState(eventoptions[0])
    const [val, setVal] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(val, placeholder, userData.username)
        await axios.post("api/users/records/event/create", { eventName: val, username: userData.username })
        .then(res => location.reload())
    }

    const updateData = () => {
        // let neweventdata = eventData
        // let temp = {
        //     eventName: val,
        //     username: userData.username,
        //     wca: true
        // }
        // neweventdata[val] = temp
        // setData(neweventdata)
    }

    return  <form onSubmit={handleSubmit}>
                <input
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder={placeholder}>
                </input>
            </form>
    // return  <Listbox value={val} onChange={setVal}>
    //             <Listbox.Button>{val}</Listbox.Button>
    //             <Listbox.Options>
    //                 {eventoptions.map(event => {
    //                     // <Listbox.Option key={event.id} value={event.submit}>
    //                     //     {event.name}
    //                     // </Listbox.Option>
    //                     {event}
    //                 })}
    //             </Listbox.Options>
    //         </Listbox>

}
export default EventForm