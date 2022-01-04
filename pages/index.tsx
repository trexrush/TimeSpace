import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import TimeSpace from '../assets/svg/Logo White v2.svg'
import MenuButton from '../components/MenuButton'
import LoginButton from '../components/LoginButton'
import NameForm from '../components/NameForm'
import { getSession, useSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import SheetDataForm from '../components/SheetDataForm'
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


  useEffect(() => {
    const loadUserData = async () => {
      const call = await axios("/api/users/data")
      .then(res => {
        setUserData(res.data[0])
      }, err => console.log(err))
    }
    loadUserData()
  }, [session])

  useEffect(() => {
    console.log(userData)
  }, [userData])

  const addSheet = async () => {
    await axios("/api/users/records/add")
    .then(res => {
      console.log(res)
    }, err => console.log(err))
  }

  const handleSheetClick = () => {
    setClick(true)
    console.log(click)
  }

  return (
    <>
      
      <Framework>
        <Image src={TimeSpace} alt='logo' height={200}/>
        {session && 
          <>
            {userData?.username ?
              <>
                <MenuButton redirect="/records">
                  View Records
                </MenuButton>
                <SheetDataForm data={userData}/>
              </> :
              <>
                {click ?
                    <NameForm data={userData}/> :
                  <button style={{color: "lime"}} onClick={ handleSheetClick }>[+ User and Sheet]</button>
                }
              </>
            }
          </>
        }
        <LoginButton session={session}/>
      </Framework>
    </>
  )
}

export default Home
