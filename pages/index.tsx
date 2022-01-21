import { useState, useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import TimeSpace from '../assets/svg/Logo White v2.svg'
import MenuButton from '../components/MenuButton'
import LoginButton from '../components/LoginButton'
import NameForm from '../components/Forms/NameForm'
import { useSession } from 'next-auth/react'
import SheetDataForm from '../components/Forms/SheetDataForm'
import Framework from '../components/Framework'

// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient()

//   // const userEmail: string = session.user.email
//   const fullUser: any = await prisma.$queryRaw`
//       SELECT username, name, email
//       FROM public.account as ac, public.user as u
//       WHERE u.id = ac."userId" and email = ${"trexrush"};`
//   return { 
//     props: { fullUser }
//   }
  
// }

const Home: NextPage = () => {
  const [userData, setUserData] = useState<any>()
  const { data: session } = useSession()
  const [click, setClick] = useState<Boolean>(false)
  const [profileFocus, setProfileFocus] = useState<Boolean>(false)

  const discord = useRef(null)


  useEffect(() => {
    const loadUserData = async () => {
      const call = await axios("/api/users/data")
      .then(res => {
        setUserData(res.data[0])
      }, err => console.log(err))
    }
    loadUserData()
  }, [session])

  const handleSheetClick = () => {
    setClick(true)
  }

  return (
    <>
      {/* @ts-ignore */}
      <Framework center>
        {/* avatar component session */}
        {session && userData?.username ?
          <div className='m-5 absolute top-0 left-0'>
            <div className=' bg-gray-400 h-12 w-12 rounded-full cursor-pointer grid place-items-center text-3xl hover:border-white hover:border-2' onClick={() => setProfileFocus(!profileFocus)}>
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
          :
          <div className='m-5 absolute top-0 left-0'>
            <LoginButton session={session}/>
          </div>
        }
        <div className='mt-48 select-none md:mt-10'>
          <Image src={TimeSpace} alt='logo' height={200} width={500}/>
        </div>

        {session ? 
          <div className='h-96 max-h-[40vh] flex flex-col justify-center'>
            {userData?.username ?
              <MenuButton redirect="/records">
                View Records
              </MenuButton>
              :
              click ?
                <NameForm data={userData}/>
                :
                <button onClick={ handleSheetClick } className='text-7xl hover:underline'>Get Started!</button>
            }
          </div>
          :
          <div className='flex flex-col w-4/5 sm:w-[600px] my-20 justify-center text-center'>
            <p className='text-5xl my-12'>
              Welcome to TimeSpace!
            </p>
            <p className='sm:text-2xl text-lg'>
              The new method to keep track of your personal records.
            </p>
            <p className='text-4xl my-8'>
              Get Started
            </p>
            <p className='sm:text-2xl text-lg'>
              Sign in using a google account to get started. <br/>
              Then you will be prompted to create a unique username, <br/>
              and then you are ready to start cataloguing your records!
            </p>
            <p className='text-4xl my-8'>
              Notice
            </p>
            <p className='sm:text-2xl text-lg'>
              TimeSpace is still early in development, <br/>
              so if you encounter any issues or something isnt clear, <br/>
              dont hesitate to reach out to me! <br/>
            </p>
            <p className='sm:text-3xl text-lg'>
              <Link passHref href="mailto:edmazuera@gmail.com?subject=TimeSpace inquiry">
                <div className='hover:underline m-0'>
                  edmazuera@gmail.com
                </div>
              </Link>
              {/* @ts-ignore: Object is possibly 'null'. */}
              <div ref={discord} onClick={() => {discord ?  navigator.clipboard.writeText(discord.current.innerHTML): null}} className='cursor-pointer hover:underline'>
                trexrush#6398
              </div>
            </p>
          </div>
        } 
        
      </Framework>
    </>
  )
}

export default Home

// Signed in as {props.session?.user?.email}

// <Link href={`${router.pathname}/${userData.username}`} passHref>
// <a style={{color: "skyblue"}}>
// Public Url: {router.pathname}/{userData.username}
// </a>
// </Link>