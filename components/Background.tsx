import Image from 'next/image'
import _333 from '../assets/svg/cubing-icons/event/333.svg'

const rand = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Background: React.FC = (props: any) => {
    // width on PC - MAX 400 MIN 175

    return  <div className='background'>
                <Image src={_333} alt="333" className='filter-bg-icon' width={rand(175, 400)}/>
            </div>
}
export default Background