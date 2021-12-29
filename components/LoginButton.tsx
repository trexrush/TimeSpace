import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"

const LoginButton = (props: any) => {
    // const { data: session } = useSession()

    useEffect(() => {
        // console.dir(props.session)
    }, [])


    return  <div>
                {props.session ?
                    <button onClick={() => signOut()}>
                        <div className="menucard">
                            <h2 className="text-white">Sign Out (Signed in as {props.session?.user?.email})</h2>
                        </div>
                    </button> :
                    <button onClick={() => signIn("google")}>
                        <div className="menucard">
                            <h2 className="text-white">Google Sign In</h2>
                        </div>
                    </button>}
            </div>
}
export default LoginButton