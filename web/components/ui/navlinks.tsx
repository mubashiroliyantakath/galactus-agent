"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {clsx} from "clsx";
import {ContainerIcon, Library, Package, RocketIcon} from "lucide-react";

const links = [
    { name: "Overview", href: '/dashboard', icon: Library },
    { name: "Containers", href: '/dashboard/containers', icon: ContainerIcon },
    { name: "Images", href: '/dashboard/images', icon: Package },
    { name: "Deploy", href: '/dashboard/deploy', icon: RocketIcon}
]

export default function NavLinks() {
    const pathname: string = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        href={link.href}
                        key={link.name}
                        className={clsx(
                                'flex flex-row mr-0.5 px-1 text-sm pb-0.5 border-blue-700 dark:border-amber-600',
                            {
                                'border-b-2  border-sky-800 font-bold shadow-lg dark:border-sky-200' : pathname === link.href
                            }
                        )}
                    >
                        <div className={`flex flex-row rounded-xl px-2 py-1 mb-2 hover:bg-slate-100 dark:hover:bg-slate-800`}>
                        <LinkIcon className={`mr-1.5`} size={17}/>
                        <p>{link.name}</p>
                        </div>
                    </Link>
                )
            })}
        </>
    )
};