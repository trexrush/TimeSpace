import axios from "axios"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"
import eventName from "../eventName"

const options = Object.entries(eventName).map((key) => {
    return { value: key[0], label: key[1] }
})

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
                                isSearchable={false}
                                value={options.find(c => c.value === value)}
                                onChange={ev => onChange(ev?.value)}
                                menuPlacement="top"
                            />
                        )}
                    />
                    <input type="submit" value="Add" className="bg-transparent cursor-pointer text-4xl mt-3 underline decoration-[rgba(255,255,255,.2)] hover:decoration-white"/>
                </form>
            </div>
        </> 
        :
        <>
            <div onClick={(() => setVisible(true))} className="cursor-pointer text-5xl underline decoration-[rgba(255,255,255,.2)] hover:decoration-white h-[180px] flex flex-col justify-center">
                Add Event
            </div>
        </>
}
export default EventForm