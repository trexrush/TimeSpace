import Head from 'next/head'
import Background from './Background'

const Framework: React.FC = (props: any) => {
    return  <>
                <Head>
                    <title>TimeSpace</title>
                    <meta name="description" content="View and edit cube records" />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="preload"
                        href="/fonts/Teko/Teko-Medium.ttf"
                        as="font"
                        crossOrigin=""
                    />
                </Head>
                <Background/>
                <main className='flex flex-col absolute'>
                    {props.children}   
                </main>
            </>
}
export default Framework