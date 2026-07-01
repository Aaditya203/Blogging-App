import  { useEffect, useState } from 'react'
import BlogCardSkeleton, { BlogCard } from '../components/BlogCard'
import NavBar from '../components/NavBar'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getBlogBulk } from '@/services/blog.service'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'
import { motion } from "framer-motion";

type BlogProps = {
  id:string,
  title:string,
  content:string,
  createdAt:string,
  author:{
    id:string,
    name:string,
  },
  _count:{
    likes:number,
  }
}
const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogProps[]>([])
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const {token} = useAuth();
  
  useEffect(()=>{

    if(!token){
     navigate('/signin')
     return;
    }
    async function getBlogs(){
      try{
        const response = await getBlogBulk();
        setBlogs(response.blogs);
      }
      catch(error){
        toast.error("Some error occured")
        console.log(error);
        return;
      }finally{
        setLoading(false);
      }
    }
    getBlogs();
  },[])

if (loading) {
  return (
    <>
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-8 sm:mb-10">
          <div className="h-10 w-60 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
        </div>

        {[...Array(5)].map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
  return (
    <div>
      <div><NavBar/></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

      <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-fair font-bold">
              Latest Articles
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-500 font-inter">
              Discover fresh insights and stories from our writers.
          </p>
      </div>

    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
    >

        {blogs.map((blog, index) => (

            <motion.div
                key={blog.id}
                initial={{
                    opacity: 0,
                    x: 120
                }}
                animate={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                    ease: "easeOut"
                }}
                onClick={() => navigate(`/blog/${blog.id}`)}
            >
                <BlogCard
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={formatDate(blog.createdAt)}
                    likeCount = {blog._count.likes}
                />
            </motion.div>

        ))}

    </motion.div>

</div>
    </div>
  )
}


export default Blogs