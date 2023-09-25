"use client"
import navState from '@/store/NavState'
import Link from 'next/link'
import useStore from '@/store/useStore'

const Navbar = () => {

//   const activeTab = navState((state) => state.active)
  const activeTab = useStore(navState, (state) => state.active)
  const updateActiveTab = navState((state) => state.setActiveTab)
  return (
    <div className='mb-4 border-b border-gray-200 dark:border-gray-700'>
        <ul className='flex flex-wrap -mb-px text-sm font-medium text-center'>
            <li >
                <Link href="/">
                <button className={`inline-block p-4 ${activeTab === 'overview-tab' ? "border-b-2 bg-slate-100"  : "hover:bg-slate-50" }`} id='overview-tab' onClick={(e) => updateActiveTab(e.currentTarget.id)}>Overview</button>
                </Link>

            </li>
            <li>
                <Link href="/containers">
                <button className={`inline-block p-4 ${activeTab === 'container-tab' ? "border-b-2 bg-slate-100"  : "hover:bg-slate-50" }`} id='container-tab' onClick={(e) => updateActiveTab(e.currentTarget.id)}>Containers</button>
                </Link>

            </li>
        </ul>
    </div>
  )
}

export default Navbar
