import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import { Bell, ChevronDown, Menu, PencilLine, PenSquare, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getAvatarInitials } from './BlogCard'
const NavBar = () => {
    const {name} = useAuth();
    const [menuOpen,setMenuOpen] = useState(false);

  return (
    <div className='relative'>
    <div className='relative z-60 flex justify-between items-center px-4 sm:px-6 lg:px-15 py-3 shadow-sm bg-white'>
        <div className='flex justify-between  gap-4 sm:gap-8 lg:gap-20 items-center' >
            <Link to={'/dashboard'}>
                <div className='font-fair text-2xl sm:text-3xl font-bold'>LIKHOO.</div>
            </Link>
            <div className='hidden lg:flex justify-between items-center gap-8 xl:gap-15 font-inter text-gray-700 pl-6 xl:pl-25'>
                <NavLink to={'/home'} className='hover:text-black'>Home</NavLink>
                <NavLink to={'/explore'} className='hover:text-black'>Explore</NavLink>
                <NavLink to={'/profile/blogs'} className='hover:text-black'>My Blogs</NavLink>
                <NavLink to={'/about'} className='hover:text-black'>About</NavLink>
            </div>
        </div>
        <div className='flex flex-row items-center justify-between gap-2 sm:gap-4 lg:gap-10'>
            <div className='hidden md:block pr-2 lg:pr-10'><SearchBar/></div>
            <Link to={'/write'}>
                <div className="flex items-center gap-2 sm:gap-3 rounded-lg bg-black px-3 sm:px-4 py-2 text-white font-medium hover:scale-105 transition font-inter text-xs sm:text-base">
                <PencilLine size={17} />
                <span className='hidden sm:inline'>Write</span>
            </div> 
            </Link>
            {/* Will be Implemented in version 2 */}
            {/* <div>
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-black"/>
                </button>
            </div> */}

            <div>
                <Link to={'/profile'}>
                        <div className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10  rounded-full bg-black text-white font-semibold text-xs sm:text-base">
                        {getAvatarInitials(name!)}
                        </div>   
                </Link>
            </div>
            <button className='lg:hidden p-2 hover:bg-gray-100 rounded-full transition' onClick={()=>{
                setMenuOpen(!menuOpen)
            }} arial-label="Toggle menu">
                {menuOpen ? <X size={22}/> :<Menu size={22}/>}
            </button>
        </div>
    </div>
    <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            menuOpen ? 'opacity-100 pointer-events-auto z-40' : 'opacity-0 pointer-events-none -z-10'
        }`}
        onClick={() => setMenuOpen(false)}
    />

    {/* Drawer feature: panel slides in/out from the right using translate-x, mobile-only, always mounted for smooth transition */}
    <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-white shadow-xl z-50 flex flex-col font-inter text-gray-700 transform transition-transform duration-300 ease-in-out lg:hidden ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
        {/* Drawer feature: header with close button so user can dismiss from inside the panel too */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
            <span className='font-fair text-xl font-bold'>Menu</span>
            <button onClick={() => setMenuOpen(false)} className='p-1 hover:bg-gray-100 rounded-full transition' aria-label='Close menu'>
                <X size={20}/>
            </button>
        </div>

        {/* Bug fix: added missing `return` inside the className functions so isActive styling actually applies */}
        <NavLink to={'/home'} onClick={()=>{setMenuOpen(false)}} className={({isActive})=>{
            return `px-6 py-3 transition ${isActive ?'bg-black text-white':'hover:bg-gray-100'}`
        }}>Home</NavLink>

        <NavLink to={'/explore'} onClick={()=>{setMenuOpen(false)}} className={({isActive})=>{
            return `px-6 py-3 transition ${isActive ?'bg-black text-white':'hover:bg-gray-100'}`
        }}>Explore</NavLink>

        <NavLink to={'/profile/blogs'} onClick={()=>{setMenuOpen(false)}} className={({isActive})=>{
            return `px-6 py-3 transition ${isActive ?'bg-black text-white':'hover:bg-gray-100'}`
        }}>My Blogs</NavLink>

        <NavLink to={'/about'} onClick={()=>{setMenuOpen(false)}} className={({isActive})=>{
            return `px-6 py-3 transition ${isActive ?'bg-black text-white':'hover:bg-gray-100'}`
        }}>About</NavLink>
    </div>
    </div>
  )
}

export default NavBar