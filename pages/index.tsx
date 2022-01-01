import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import axios from 'axios'
// import Link from 'next/link'
import TimeSpace from '../assets/svg/TimeSpaceW.svg'
import MenuButton from '../components/MenuButton'
import LoginButton from '../components/LoginButton'
import NameForm from '../components/NameForm'
import { getSession, useSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

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
      <Head>
        <title>TimeSpace</title>
        <meta name="description" content="View and edit cube records"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main">
        {session && 
          <>
            {userData?.username ?
              <MenuButton redirect="/records">
                View Records
              </MenuButton> :
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
      </main>
    </>
  )
}

export default Home
