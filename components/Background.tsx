import Image from 'next/image'
import React from 'react'

import _222 from '../assets/svg/cubing-icons/event/222.svg'
import _333 from '../assets/svg/cubing-icons/event/333.svg'
import _444 from '../assets/svg/cubing-icons/event/444.svg'
import _555 from '../assets/svg/cubing-icons/event/555.svg'
import _666 from '../assets/svg/cubing-icons/event/666.svg'
import _777 from '../assets/svg/cubing-icons/event/777.svg'
import _333bf from '../assets/svg/cubing-icons/event/333bf.svg'
import _sq1 from '../assets/svg/cubing-icons/event/sq1.svg'
import _minx from '../assets/svg/cubing-icons/event/minx.svg'
import _pyra from '../assets/svg/cubing-icons/event/pyram.svg'
import _skewb from '../assets/svg/cubing-icons/event/skewb.svg'
import _clock from '../assets/svg/cubing-icons/event/clock.svg'

const rand = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Background: React.FC = (props: any) => {
    // width on PC - MAX 400 MIN 175
    return  <div className='background'>
                <EventImage {..._333}/>
                <EventImage {..._skewb}/>
                <EventImage {..._666}/>
                <EventImage {..._sq1}/>
                
                {/* <Image src={_444} alt="444" className='filter-bg-icon absolute' width={rand(175, 400)}/>
                <Image src={_sq1} alt="sq1" className='filter-bg-icon absolute' width={rand(175, 400)}/> */}
            </div>
}

const EventImage: React.FC = (src: any) => {
    return  <div className='absolute select-none' style={{left: `${rand(1,100)}%`, top: `${rand(1,70)}%`,}}>
                <Image 
                    src={src} alt="background event logo" 
                    className='filter-bg-icon absolute' 
                    width={rand(175, 400)}
                    draggable={false}
                />
            </div>
}

export default Background