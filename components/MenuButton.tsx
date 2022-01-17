import { Grid } from "@mui/material"
import Link from "next/link"

const MenuButton = (props: any) => {
    return  <div>
                <Link href={props.redirect} passHref>
                    <div className="menucard">
                        <div className="cursor-pointer underline decoration-[rgba(255,255,255,.2)] text-white text-6xl hover:decoration-white">{props.children}</div>
                    </div>
                </Link>
            </div>
}
export default MenuButton