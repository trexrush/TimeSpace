import axios from "axios"
import React, { useState } from "react"
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
    { value: "333bf", label: "3x3 Blindfolded" },
    { value: "333fm", label: "3x3 Fewest Moves" },
    { value: "333mbf", label: "3x3 Multi Blind" },
    { value: "333oh", label: "3x3 One-Handed" },
    { value: "444bf", label: "4x4 Blindfolded" },
    { value: "555bf", label: "5x5 Blindfolded" },
    { value: "clock", label: "Rubiks Clock" },
    { value: "minx", label: "Megaminx" },
    { value: "pyram", label: "Pyraminx" },
    { value: "skewb", label: "Skewb" },
    { value: "sq1", label: "Square-1" },
    { value: "333ft", label: "Rubiks Cube with Feet" },
    { value: "magic", label: "Rubiks Magic" },
    { value: "mmagic", label: "Master Magic" },
    { value: "333mbo", label: "3x3 Multi Blind Old-Style" },
    // { value: "", label: "Unofficial" }
]

const EventForm = ({ userData, eventData, setData }: any) => {
    const [visible, setVisible] = useState(false)
    const {control, handleSubmit} = useForm();

    const onSubmit = async (data: any) => {
        setVisible(false)
        await axios.post("api/users/records/event/create", { eventName: data.addEvent, username: userData.username })
        .then(res => location.reload())
        // use eventData and setData to automatically update the rendering without refreshing
    }

    const selectStyles = {
        option: (provided: any, { isFocused }: any) => ({ // the options in the dropdown
            ...provided,
            color: "white",
            backgroundColor: isFocused ? "rgba(255, 255, 255, 0.3)" : null,
            cursor: "pointer",
            textAlign: "center",
        }),
        singleValue: (provided: any, state: any) => ({ // active value
            ...provided,
            color: "white",
            fontSize: 36
        }),
        control: (provided: any) => ({ // main
            ...provided,
            border: "3px solid",
            borderRadius: "10px",
            backgroundColor: "transparent",
            width: 200,
            cursor: "pointer",
            boxShadow: "none",
            ":hover": {
                borderColor: "skyblue"
            }
        }),
        indicatorSeparator: (provided: any) => ({ // separator
            backgroundColor: "transparent"
        }),
        menu: (provided: any) => ({ // menu element
            ...provided,
            border: "3px solid",
            borderRadius: "10px",
            backgroundColor: "rgba(19, 6, 37, .7)",
            overflowY: "hidden"
        }),
    }
    
    return visible ? 
        <>
            <div className="flex flex-col items-center justify-center border-[4px] border-white h-[180px] w-[300px] rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                    <label htmlFor="eventSelect">Select an event to add </label>
                    <Controller
                        control={control}
                        name="addEvent"
                        render={({ field: { onChange, value, name, ref } }) => (
                            <Select
                                inputId="eventSelect"
                                classNamePrefix="eventForm"
                                options={options}
                                styles={selectStyles}
                                defaultValue={options[0]}
                                value={options.find(c => c.value === value)}
                                onChange={ev => onChange(ev?.value)}
                                menuPlacement="top"
                            />
                        )}
                    />
                    <input type="submit" value="Add" className="bg-transparent cursor-pointer text-4xl"/>
                </form>
            </div>
        </> 
        :
        <>
            <div onClick={(() => setVisible(true))} className="cursor-pointer text-5xl underline">
                Add Event
            </div>
        </>
}
export default EventForm