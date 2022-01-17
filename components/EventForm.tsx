import { width } from "@mui/system"
import axios from "axios"
import React, { useState, Fragment } from "react"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"

const options = [
    { value: "333", label: "3x3" },
    { value: "222", label: "2x2" },
    { value: "333", label: "3x3" },
    { value: "444", label: "4x4" },
    { value: "555", label: "5x5" },
    { value: "666", label: "6x6" },
    { value: "777", label: "7x7" },
    { value: "333bf", label: "3BLD" },
    { value: "333fm", label: "Fewest Moves" },
    { value: "333ft", label: "Feet" },
    { value: "333mbf", label: "Multi BLD" },
    { value: "333mbo", label: "Multi BLD Old Style" },
    { value: "333oh", label: "One-Handed" },
    { value: "444bf", label: "4BLD" },
    { value: "555bf", label: "5BLD" },
    { value: "clock", label: "Rubiks Clock" },
    { value: "magic", label: "Rubiks Magic" },
    { value: "minx", label: "Megaminx" },
    { value: "mmagic", label: "Master Magic" },
    { value: "pyram", label: "Pyraminx" },
    { value: "skewb", label: "Skewb" },
    { value: "sq1", label: "Square-1" },
    { value: "", label: "Unofficial" }
]

const EventForm = ({ placeholder, userData, eventData, setData }: any) => {
    const [val, setVal] = useState('')
    const [visible, setVisible] = useState(false)

    const {control} = useForm();

    const onSubmit = (data: any) => console.log(data)

    const selectStyles = {
        option: (provided: any, { isFocused }: any) => ({ // the options in the dropdown
            ...provided,
            color: "black",
            backgroundColor: isFocused ? "#999999" : null,
        }),
        singleValue: (provided: any, state: any) => ({ // active value
            ...provided,
            color: "grey"
        }),
        control: (provided: any) => ({ // main
            ...provided,
            border: "none",
            backgroundColor: "transparent",
            borderColor: "red",
            width: 200,
        })
    }
    
    return visible ? 
        <>
            <div className="flex flex-col items-center justify-center border-[4px] border-white h-[300px] w-[300px] rounded-xl">
                <form onSubmit={onSubmit} className="flex flex-col items-center">
                    <Controller
                        control={control}
                        name="addEvent"
                        render={({ field: { onChange, value, name, ref } }) => (
                            <Select options={options} styles={selectStyles}/>
                        )}
                    />
                    <input type="submit" className="bg-transparent"/>
                </form>
            </div>
            <div onClick={(() => setVisible(false))} className="cursor-pointer">
                Temp disable
            </div>
        </> 
        :
        <>
            <div onClick={(() => setVisible(true))} className="cursor-pointer">
                [+ Add Event]
            </div>
        </>
    


    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     console.log(val, placeholder, userData.username)
    //     await axios.post("api/users/records/event/create", { eventName: val, username: userData.username })
    //     .then(res => location.reload())
    // }


    // return  <form onSubmit={handleSubmit}>
    //             <input
    //             type="text"
    //             value={val}
    //             onChange={e => setVal(e.target.value)}
    //             placeholder={placeholder}>
    //             </input>
    //         </form>

}
export default EventForm