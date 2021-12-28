// import { styled } from '@mui/system'
import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
// import data from '../components/data'
import axios from 'axios'
// import useAxios from 'axios-hooks'
import Link from 'next/link'
// import { Container, Grid } from '@mui/material'
import TimeSpace from '../assets/svg/TimeSpaceW.svg'
import MenuButton from '../components/MenuButton'
import LoginButton from '../components/LoginButton'
import NameForm from '../components/NameForm'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>TimeSpace</title>
        <meta name="description" content="View and edit cube records" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main">
        {session && 
          <>
            <MenuButton redirect="/records">View Records</MenuButton>
            <NameForm/>
          </>    
        }
          <LoginButton/>
      </main>
    </>
  )
}

export default Home
