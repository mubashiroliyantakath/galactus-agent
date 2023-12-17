import NavBar from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"flex flex-col"}>
            <NavBar/>
            <div>
                {children}
            </div>
        </div>
    )
}