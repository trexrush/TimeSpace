import { Grid } from "@mui/material"
import Link from "next/link"
import { Url } from "url"

const MenuButton = (props: any) => {
    return  <Grid item xs={3}>
                <Link href={props.redirect} passHref>
                    <div className="card">
                        {/* <div className="cardrect"></div> */}
                        <h2 className="cursor-pointer text-white">{props.children}</h2>
                    </div>
                </Link>
            </Grid>
}
export default MenuButton