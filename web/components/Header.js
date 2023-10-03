"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navbar from './Navbar'
import navState from '@/store/NavState';
import useStore from '@/store/useStore';

const Header = () => {
  const activeTab = useStore(navState, (state) => state.active)
  const updateActiveTab = navState((state) => state.setActiveTab)
  return (
    <div className="bg-white/20 backdrop-blur-md pt-7 pr-7 pl-7 border-none flex flex-col space-y-4 sticky top-0 z-50">
        <Link href="/">
            <Image alt='Logo for Galactus Agent' src="/vercel.svg" height={60} width={60} onClick={(e) => updateActiveTab("overview-tab")}/>
        </Link>
        <Navbar/>
    </div>
  )
}

export default Header;
