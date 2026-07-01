import MyBlogs from '@/components/MyBlogs'
import NavBar from '@/components/NavBar'
import ProfileSidebar from '@/components/ProfileLeft'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const MyBlogsPage = () => {
  const {name,email} = useAuth();
  
  return (
    <div>
        <NavBar/>
        <div className='flex flex-col lg:flex-row p-3 sm:p-6 items-start min-h-screen gap-4 lg:gap-8'>
            <ProfileSidebar name={name!} email={email!}/>
            <MyBlogs/>
        </div>
    </div>
  )
}

export default MyBlogsPage