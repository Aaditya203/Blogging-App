import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import NavBar from '@/components/NavBar'
import { useAuth } from '@/context/AuthContext';
import { getBlogById, updateBlog } from '@/services/blog.service';
import Tiptap from '../components/TipTap'
import { ArrowLeft, CalendarDays, NotebookPen, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import LoaderAnim from '@/components/LoaderAnim';
import axios from 'axios';
import { DatePickerTime } from "@/components/DateTimePicker";


const EditBlog = () => {
    const {id} = useParams<{id:string}>();
    const {token} = useAuth();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [loading,setLoading] = useState(true);
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const [isUpdating,setIsUpdating] = useState(false);
    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  };
      const onContentChange = (newContent: string) => {
        setContent(newContent);
        };

    const navigate = useNavigate();
    useEffect(()=>{
        async function getBlog(){
            if(!token){
                navigate('/signin');
                return;
            }
            if(!id){
                navigate('/dashboard');
                return;
            }
            try{
                const response = await getBlogById(id);
                setTitle(response.data.blogs.title)
                setContent(response.data.blogs.content)
            }
            catch(error){
                toast.error("Some Error Occurred")
                console.log(error);
                return;
            }
            finally{
                setLoading(false);
            }
        }
        getBlog();
        
    },[])
    const handleUpdate = async()=>{
      if(!id){
        navigate('/dashboard');
        return;
      }
      if(!title.trim()){
        toast.error("Title Required")
        return;
      }
      if(!content || content==="<p></p>"){
        toast.error("Content Required")
        return;
      }

      try{
        setIsUpdating(true);
        await updateBlog(id,title,content);
        toast.success("Blog Updated Successfully");
        navigate('/dashboard');
        return;
    }catch(error){
      if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.mssg || "Some Error Occurred");
  } else {
    toast.error("Some Error Occurred");
  }
    }
    finally{
      setIsUpdating(false)
    }
  }
    if(loading){
        return(
            <div className='flex h-screen justify-center items-center text-4xl'>Loading...</div>
        )
    }
  return (
    <div>
        <NavBar/>
        <div className="flex flex-1 overflow-hidden pt-4">
        
        {/* Left — editor */}
        <div className="w-4/5 border-r border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className='p-8'>
            <Link to={'/profile/blogs'}>
                <div className='flex items-center gap-2 text-gray-600 ml-8 hover:text-black'>
                    <ArrowLeft size={17}/>
                    <div className='font-inter'>Back to blogs</div>
                </div>
            </Link>
        <div className="shrink-0 px-8 py-5">
        <textarea
          ref={titleRef}
          placeholder="Add a title..."
          value={title}
          onChange={handleTitleChange}
          rows={1}
          className="w-full resize-none overflow-hidden bg-transparent border-none outline-none 
                     text-4xl font-bold placeholder:text-gray-300 text-black
                     dark:text-white dark:placeholder:text-gray-600
                     leading-tight font-fair"
        />
      </div>
        <div className="px-6 mt-6">
        <Tiptap onChange={onContentChange} content={content}/>
      </div>
    </div>

        </div>

        {/* Right — sidebar */}
        <div className="w-1/5 overflow-y-auto p-8">
        <div className="flex flex-col ">

          <div className="flex flex-row items-center gap-2 font-semibold pb-5 font-inter">
              <NotebookPen className="h-4 w-4 text-black" /> 
              <div>UPDATES</div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className={'bg-black rounded-md py-5.5 mb-2 w-full font-inter'}>{isUpdating ? <LoaderAnim /> : "Update Blog"}</Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Update this blog?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will overwrite the existing content. Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleUpdate}>
                    {isUpdating ? <LoaderAnim /> : "Yes, Update"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button className={'py-5 rounded-md bg-white text-black border-r border-black hover:bg-gray-200 font-inter'}>Save Draft</Button>
            <div className="mt-2"><hr className="h-px my-8 bg-gray-200 border-0"/></div>
            <div className="flex flex-row items-center gap-2 font-semibold pb-5 font-inter">
              <CalendarDays className="h-4 w-4 text-black" /> 
              <div>SCHEDULE</div>
            </div>
            <div><DatePickerTime/></div>
            <div className="mt-2"><hr className="h-px my-8 bg-gray-200 border-0"/></div>
            <div className="flex flex-row items-center gap-2 font-semibold pb-5 font-inter">
              <Sparkles className="h-4 w-4 text-black" /> 
              <div>AI ASSISTANT</div>
            </div>
            <div className="flex flex-col  gap-2">
            <Button className={'py-5 rounded-md bg-black  text-white border-r border-black hover:bg-slate-900 font-inter'}>Suggest Title</Button>
            <Button className={'py-5 rounded-md bg-white text-black border-r border-black hover:bg-gray-200 font-inter'}>Improve Grammar</Button>
            </div>

        </div>
        </div>

      </div>
    </div>
  )

}
export default EditBlog