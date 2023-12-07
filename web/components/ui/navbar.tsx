import {jetbrains} from "@/components/ui/fonts";
import NavLinks from "@/components/ui/navlinks";

export default function NavBar() {
    return (
        <div className={`${jetbrains.className} flex flex-col w-full m-4 pt-4 px-4 border-b`}>
            <span className={"text-2xl antialiased font-bold"}>Galactus Agent Dashboard</span>
            <div className={`flex flex-row mt-7`}>
                <NavLinks/>
            </div>
        </div>
    )
}