import Head from 'next/head'
import Background from './Background'

const Framework: React.FC = (props: any) => {
    return  <>
                <Head>
                    <title>TimeSpace</title>
                    <meta name="description" content="View and edit cube records" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Background/>
                <main className='main'>
                    {props.children}   
                </main>
            </>
}
export default Framework