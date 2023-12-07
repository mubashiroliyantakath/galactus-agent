import NavBar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"flex flex-col"}>
            <NavBar/>
            <div className={"w-full h-full p-5"}>
                {children}
            </div>
        </div>
    )
}