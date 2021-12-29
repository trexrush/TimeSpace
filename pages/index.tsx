import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import axios from 'axios'
// import Link from 'next/link'
// import { Container, Grid } from '@mui/material'
import TimeSpace from '../assets/svg/TimeSpaceW.svg'
import MenuButton from '../components/MenuButton'
import LoginButton from '../components/LoginButton'
import NameForm from '../components/NameForm'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const [userData, setUserData] = useState<any>()
  const { data: session } = useSession()

  const loadUserData = async () => {
    const call = await axios("/api/users/data")
    .then(res => {
      setUserData(res.data[0])
      console.dir(userData)

    }, err => console.log(err))
  }

  useEffect(() => {
    loadUserData()
  }, [])


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
            <MenuButton redirect="/records">View Records</MenuButton>
            <NameForm data={userData}/>
          </>    
        }
          <LoginButton session={session}/>
      </main>
    </>
  )
}

export default Home
