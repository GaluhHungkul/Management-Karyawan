"use client"

import { HomeIcon,  PanelRightClose, UserPlus } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {  ElementType, useState } from "react"


interface IsideBarNav {
  id : number;
  title : string;
  icon : ElementType;
  href : string;
}

const sideBarNav:IsideBarNav[] = [
  {  id : 1, title : 'Dashboard', icon : HomeIcon, href : '/'},
  {  id : 2, title : 'Tambah Karyawan', icon : UserPlus, href : '/tambahkaryawan'}
]

const Sidebar = () => {

    const [showSidebar, setShowSidebar] = useState<boolean>(false)   

    const pathname = usePathname()

  return (
    <motion.div 
    style={{
        width: showSidebar ? 256 : 100
    }}
    className="flex-shrink-0 relative z-10  ease-in-out duration-300 overflow-hidden"> 
      <div className="flex flex-col h-full bg-blue-700  ">
          <button onClick={() => setShowSidebar(!showSidebar)} className={`border m-6 relative  size-max bg-gray-200 p-2 hover:scale-110 active:scale-125 hover:bg-gray-300 rounded-full duration-300 ${showSidebar && 'rotate-180 ml-40 '} `}>
              <PanelRightClose size={24} color="rgba(0,0,200,1)"/> 
          </button>
          <nav className="flex flex-grow flex-col mt-8">
              {sideBarNav.map((item) => (
                <Link className={`flex gap-4 pl-6 py-4 items-center text-gray-200   hover:scale-110 duration-200  ${pathname == item.href ? 'scale-110 bg-blue-800' : 'hover:bg-blue-500 hover:text-white'}`} href={item.href} key={item.id}>
                  <item.icon size={24} className="min-w-10"/>
                  { showSidebar && 
                  <motion.span
                  initial={{
                    opacity : 0,
                    width: 0
                  }}
                  animate={{
                    opacity : 1,
                    width: '100%'
                  }}
                  exit={{
                    opacity : 0,
                    width: 0
                  }}
                  transition={{
                    duration : 0.5
                  }}
                  className="whitespace-nowrap"
                  >
                    {item.title}
                  </motion.span>}
                </Link>
              ))}
          </nav>
      </div>
    </motion.div>
  )
}

export default Sidebar