import { Bookmark, CalendarDays, Eye, File, Heart, Link, MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { getProfileDetails } from '@/services/auth.service';
import { getAvatarInitials } from './BlogCard';
import { formatDate } from '@/lib/utils';
type Profile = {
    id:string;
    name:string;
    username:string;
    bio:string | null;
    country: string | null;
    portfolio: string | null;
    joinedAt: string;
    email:string
}

type Props={
    setName: (name:string)=>void;
    setEmail: (email:string)=>void;
}

const ProfileCard = () => {
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();
    const {token} = useAuth();
    const[loading,setLoading] = useState(false);
    const [profileDetails,setProfileDetails] = useState<Profile | null>(null);

    useEffect(()=>{
        if(!token){
            toast.error("Sign In Again!")
            navigate('/signin')
            return;
        }
        async function getDetails(){
            try{
                setLoading(true)
                const details = await getProfileDetails();
                setProfileDetails(details);

            }catch(error){
                toast.error("Unable To fetch Details")
                console.log(error);
                return;
            }
            finally{
                setLoading(false);
            }
        }
        getDetails();
    },[token])



  return (
    <div className='relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm w-full mr-0 lg:mr-10'>

        <div className='absolute inset-0 bg-cover' style={{
          backgroundImage: "url('/src/assets/profileBG.png')",
        }}/>
        <div className="absolute inset-0 bg-white/" />


        <div className='relative z-10 flex flex-col px-4 sm:px-6 lg:px-10 py-6 lg:py-8'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 sm:gap-0'>
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-center text-center sm:text-left w-full sm:w-auto'>
                <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-35 lg:h-35 rounded-full bg-black flex items-center justify-center text-white text-2xl sm:text-4xl lg:text-5xl font-bold shrink-0">{getAvatarInitials(profileDetails?.name || "")}</div>

                <div className='flex flex-col gap-2 items-center sm:items-start'>
                    <div className='text-xl sm:text-2xl lg:text-3xl font-bold'>{profileDetails?.name}</div>
                    <div className='flex flex-row flex-wrap justify-center sm:justify-start gap-3 sm:gap-5 items-center text-gray-500'>
                        <div>@{profileDetails?.username}</div>
                        <div className='w-1 h-1 rounded-full bg-gray-500'/>
                        <div>{formatDate(profileDetails?.joinedAt!)}</div>
                    </div>
                    <div className='text-gray-500 font-inter'>{profileDetails?.bio}
                    </div>
                    <div className='flex flex-row flex-wrap justify-center sm:justify-start pt-2 gap-3 sm:gap-5 text-gray-400'>
                        <div className='flex flex-row gap-2'>
                            <MapPin/>
                            <div>{profileDetails?.country ?? "Not Set"}</div>
                        </div>
                        <div className="w-px h-5 bg-gray-300 self-center hidden sm:block" />
                        <div className='flex flex-row gap-2'>
                            <Link/>
                            <div>{profileDetails?.portfolio}</div>
                        </div>
                        <div className="w-px h-5 bg-gray-300 self-center hidden sm:block" />
                        <div className='flex flex-row gap-2'>
                            <CalendarDays/>
                            <div>{formatDate(profileDetails?.joinedAt!)}</div>
                        </div>
                    </div>
                </div>
                </div>
                <div className='w-full sm:w-auto'>
                    <div onClick={()=>(setOpen(true))} className='border border-gray-400 px-5 py-3 rounded-xl items-center text-black text-center sm:text-left'>Edit Profile</div>
                    <EditProfile isOpen={open} onClose={()=> setOpen(false)} profile ={profileDetails} onProfileUpdated ={(updatedProfile)=>{
                        setProfileDetails(updatedProfile)
                    }}/>
                </div>
            </div>
            {/* <div className='grid grid-cols-2 sm:flex sm:flex-row border rounded-xl p-4 sm:p-5 justify-between mt-5 bg-white gap-4 sm:gap-0 pr-4 sm:pr-20'>
                <div className='flex flex-row items-center gap-3 sm:gap-5'>
                    <div className='px-2  py-2 border border-gray-300 rounded-2xl'>
                    <File/>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-lg sm:text-2xl font-bold'>12</div>
                        <div className='text-sm sm:text-gray-500'>Posts</div>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-3 sm:gap-5'>
                <div className="w-px h-12 bg-gray-300 self-center hidden sm:block" />
                    <div className='px-2  py-2 border border-gray-200 rounded-2xl'>
                    <Eye/>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-lg sm:text-2xl font-bold'>3.2K</div>
                        <div className='text-sm sm:text-gray-500'>Views</div>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-3 sm:gap-5'>
                <div className="w-px h-12 bg-gray-300 self-center hidden sm:block" />
                    <div className='px-2  py-2 border border-gray-200 rounded-2xl'>
                    <Heart/>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-lg sm:text-2xl font-bold'>256</div>
                        <div className='text-sm sm:text-gray-500'>Likes</div>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-3 sm:gap-5'>
                <div className="w-px h-12 bg-gray-300 self-center hidden sm:block" />
                    <div className='px-2  py-2 border border-gray-200 rounded-2xl'>
                    <Bookmark />
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-lg sm:text-2xl font-bold'>89</div>
                        <div className='text-sm sm:text-gray-500'>Bookmarks</div>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default ProfileCard