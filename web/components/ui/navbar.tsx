import {inter} from "@/components/ui/fonts";
import NavLinks from "@/components/ui/navlinks";
import Link from "next/link";

export default function NavBar() {
    return (
        <div className={`${inter.className} flex flex-col m-4 pt-4 px-4 border-b`}>
            <Link href={`/dashboard`}>
                <span className={"text-2xl ml-3 antialiased font-bold"}>Galactus Agent Dashboard</span>
            </Link>
            <div className={`flex flex-row mt-4`}>
                <NavLinks/>
            </div>
        </div>
    )
}