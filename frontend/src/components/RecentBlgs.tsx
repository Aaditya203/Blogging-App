import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import { getMyBlogs } from "@/services/blog.service";
import {
  Heart,
  MoreVertical,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type BlogsProps = {
  id:string,
  title:string,
  createdAt:string,
  _count:{
    likes:number
  }
}
export default function RecentBlogs() {
  const [blogs,setBlogs] = useState<BlogsProps[]>([]);
  const {token} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    async function getBlogs(){
      if(!token){
        navigate('/signin')
        return;
      }
      try{
        const response = await getMyBlogs();
        setBlogs(response.blogs);
        toast.success("Welcome to your World Of Blogs!")
      }
      catch(err){
        toast.error("Some error occurred");
        console.log(err);
        return;
      }
      finally{
        
      }
    }

    getBlogs();
  },[])

  return (
    <section className="mt-8 rounded-3xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5">

        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Recent Blogs
        </h2>
        <NavLink to={'/profile/blogs'}>
        <button className="group flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black cursor-pointer">
          <span className="hidden sm:inline">View all blogs</span>
          <span className="sm:hidden">View all</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
        </NavLink>

      </div>


      <div>

        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`}>
          <div
            key={blog.id}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-4 transition hover:bg-gray-50`}
          >
            {/* Left */}

            <div className="flex items-center gap-4">
              <div>

                <h3 className="font-semibold text-gray-900 font-fair">
                  {blog.title}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">

                  <span>Published</span>

                  <div className="h-1 w-1 rounded-full bg-gray-400" />

                  <span>{formatDate(blog.createdAt)}</span>

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="flex items-center flex-wrap gap-4 sm:gap-8 text-sm text-gray-500">

              {/* <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                3.6K
              </div> */}

              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                {blog._count.likes}
              </div>

              {/* <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                100
              </div> */}

              <button className="rounded-lg p-2 transition hover:bg-gray-100">
                <MoreVertical className="h-4 w-4" />
              </button>

            </div>
          </div>
          </Link>
        ))}

      </div>

    </section>
  );
}