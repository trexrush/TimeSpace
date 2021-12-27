import { Grid } from "@mui/material"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = (props: any) => {
    const { data: session } = useSession()


    return  <Grid item xs={3}>
                {session ?
                    <button onClick={() => signOut()}>
                        <div className="menucard">
                            <h2 className="text-white">Sign Out (Signed in as {session?.user?.email})</h2>
                        </div>
                    </button> :
                    <button onClick={() => signIn("google")}>
                        <div className="menucard">
                            <h2 className="text-white">Google Sign In</h2>
                        </div>
                    </button>}
            </Grid>
}
export default LoginButton