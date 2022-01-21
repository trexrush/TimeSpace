import { useState } from "react"
import SheetDataForm from "./Forms/SheetDataForm"
import LoginButton from "./LoginButton"

const Profile: React.FC = ({ userData, session }: any) => {
    const [profileFocus, setProfileFocus] = useState<Boolean>(false)

    return <div className='m-5 absolute top-0 left-0'>
            <div 
                className=' bg-gray-400 h-12 w-12 rounded-full cursor-pointer grid place-items-center text-3xl hover:border-white hover:border-2'
                onClick={() => setProfileFocus(!profileFocus)}
            >
                <div className='select-none'>
                    {userData?.username[0].toUpperCase()}
                </div>
            </div>
            {profileFocus &&
                <div className='flex flex-col justify-start'> 
                    <SheetDataForm data={userData}/>
                    <LoginButton session={session}/>
                </div>
            }
        </div>
}
export default Profile