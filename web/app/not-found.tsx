import { Separator } from "@/components/ui/separator"
import {jetbrains} from "@/components/ui/fonts";
export default function notFound () {
    return (
        <main className={`${jetbrains.className} flex h-screen flex-col items-center justify-center`}>
            <div className={`flex flex-row`}>
                <span className={`text-black mr-4 dark:text-white`}>404</span>
                <Separator orientation={"vertical"}/>
                <span className={`text-black ml-4 dark:text-white`}>Not Found</span>
            </div>
        </main>
    )
}