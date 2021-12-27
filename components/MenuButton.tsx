import { Grid } from "@mui/material"
import Link from "next/link"

const MenuButton = (props: any) => {
    return  <div>
                <Link href={props.redirect} passHref>
                    <div className="menucard">
                        <div className="cursor-pointer text-white">{props.children}</div>
                    </div>
                </Link>
            </div>
}
export default MenuButton