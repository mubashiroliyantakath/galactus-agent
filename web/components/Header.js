import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className="bg-none bg-transparent p-7 border-none flex flex-col space-y-5 sticky top-0 z-50">
        <Link href="/">
            <Image alt='Logo for Galactus Agent' src="vercel.svg" height={60} width={60}/>
        </Link>
        <Navbar/>
    </div>
  )
}

export default Header
