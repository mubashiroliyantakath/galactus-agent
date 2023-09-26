"use client"
import navState from '@/store/NavState'
import Link from 'next/link'
import useStore from '@/store/useStore'

const Navbar = () => {

//   const activeTab = navState((state) => state.active)
  const activeTab = useStore(navState, (state) => state.active)
  const updateActiveTab = navState((state) => state.setActiveTab)
  const navItems = [
    {
        label: "Overview",
        linkhref: "/",
        id: "overview-tab"
    },
    {
        label: "Containers",
        linkhref: "/dashboard/containers",
        id: "container-tab"
    },
    {
        label: "Images",
        linkhref: "/dashboard/images",
        id: "image-tab"
    }
]
  return (
    <div className='mb-4 border-b border-gray-200 dark:border-gray-700'>
        <ul className='flex flex-wrap -mb-px text-sm font-medium text-center'>
            {
                navItems.map((item) =>
                <li key={item.id}>
                    <Link href={item.linkhref}>
                        <button className={`inline-block p-4 ${activeTab === item.id ? "border-b-2 border-blue-800"  : "hover:bg-slate-50" }`} id={item.id} onClick={(e) => updateActiveTab(e.currentTarget.id)}>{item.label}</button>
                    </Link>
                </li>)
            }
        </ul>
    </div>
  )
}

export default Navbar
