"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {clsx} from "clsx";


const links = [
    { name: "Overview", href: '/dashboard' },
    { name: "Containers", href: '/dashboard/containers' },
    { name: "Images", href: '/dashboard/images' }
]

export default function NavLinks() {
    const pathname: string = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        href={link.href}
                        key={link.name}
                        className={clsx(
                                'px-4 hover:bg-secondary dark:hover:bg-secondary',
                            {
                                'border-b border-sky-800 shadow-lg dark:border-sky-200' : pathname === link.href
                            }
                        )}
                    >
                        <p>{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
};