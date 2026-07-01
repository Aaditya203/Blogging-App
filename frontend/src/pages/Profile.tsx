import NavBar from '@/components/NavBar'
import ProfileCard from '@/components/ProfileCard'
import ProfileSidebar from '@/components/ProfileLeft'
import RecentBlogs from '@/components/RecentBlgs'
import { useAuth } from '@/context/AuthContext'



const Profile = () => {
  const {name} = useAuth();
  const {email} = useAuth();
  return (
    <>
    <NavBar/>
    <div className='flex flex-col lg:flex-row p-3 sm:p-6 items-start min-h-screen gap-4 lg:gap-8'>
        <ProfileSidebar name={name??""} email={email??""}/>
        <div className='flex-1 gap-8 w-full'>
        <ProfileCard />       
        <RecentBlogs/>
        </div>
    </div>
    </>
  )
}

export default Profile