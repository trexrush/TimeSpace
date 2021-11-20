import { styled } from '@mui/system'
import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.sass'
// import data from '../components/data'
import axios from 'axios'
import useAxios from 'axios-hooks'
import { SliderValueLabelUnstyled } from '@mui/base'
import { integerPropType } from '@mui/utils'
import Link from 'next/link'

interface IEvent {
  event?: string,
  wca: boolean,
  single?: string | number,
  values: string[] | number[]
}

const Event: NextPage = () => {
  let [data, setData] = useState<IEvent>({
    event: "",
    wca: false,
    single: "",
    values: Array(6).fill(0)
  })

  useEffect(() => {
    const fetchData = async () => {
        const result = await axios('https://firestore.googleapis.com/v1/projects/pb-tracker-af3ef/databases/(default)/documents/Event/3x3')
        let res = result.data.fields


        let times: string[] | number[] = data.values
        for (let i: number = 0; i < 6; i++) {
          times[i] = (Object.values(res.times.arrayValue.values[i])[0])
        }

        setData({
          ...data,
          event: res.name.stringValue,
          wca: res.wca.booleanValue,
          single: Object.values(res.single)[0],
          values: times
        })
    }
    fetchData()
    console.log(data)
  }, [])

  return (
    <main className={styles.main}>
      <div className={`${styles.card}`}>
        <h1 className={`${styles.title} flex justify-center`}>
          <a>{data.event}</a>
        </h1>
        <p className={`${styles.description}`}>
          <code>{data.wca ? "WCA event" : "Non WCA event"}</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="#" passHref>
              <>
                <h2>Single</h2>
                <p>{data.single}</p>
              </>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="#" passHref>
              <>
                <h2>Average of 5</h2>
                <p>{data.values[1]}</p>
              </>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="#" passHref>
              <>
                <h2>Average of 12</h2>
                <p>{data.values[2]}</p>
              </>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="#" passHref>
              <>
                <h2>Average of 50</h2>
                <p>{data.values[4]}</p>
              </>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="#" passHref>
              <>
                <h2>Average of 100</h2>
                <p>{data.values[5]}</p>
              </>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Event
