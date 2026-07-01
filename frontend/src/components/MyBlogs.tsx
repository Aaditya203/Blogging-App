import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Filter,
  Pencil,
  Trash2,
  Eye,
  MoreVertical,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getMyBlogs } from "@/services/blog.service";
import { toast } from "sonner";
import LoaderAnim from "./LoaderAnim";
import { formatDate } from "@/lib/utils";

type BlogStatus = "Published" | "Draft" | "Archived";


type BlogsProps = {
  id:string,
  title:string,
  createdAt:string,
  _count:{
    likes:number
  }
}

const statusStyles: Record<BlogStatus, string> = {
  Published:
    "bg-green-100 text-green-700 border border-green-200",
  Draft:
    "bg-blue-100 text-blue-700 border border-blue-200",
  Archived:
    "bg-gray-100 text-gray-700 border border-gray-200",
};

export default function BlogManagement() {

  const {token} = useAuth();
  const [blogs,setBlogs] = useState<BlogsProps[]>([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams<{id:string}>();
  const [isDeleted,setIsDeleted] = useState(false);
  const [blogToDelete,setBlogToDelete] = useState<string | null>(null);

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
        setLoading(false);
      }
    }

    getBlogs();
  },[])

  const handleDelete = async (id:string)=>{
    if(!token){
      navigate('/signin')
      return;
    }
    try{
      setIsDeleted(true);
      const response = await deleteBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      toast.success("Deleted Successfully!");

    }
    catch(error){
      toast.error("Some error Occurred!")
      console.log(error);
    }
    finally{
      setIsDeleted(false);
      setBlogToDelete(null)
    }
  }


  return (
    <div className="rounded-3xl bg-white shadow-sm  border border-gray-200 overflow-hidden w-full">
      <AlertDialog open={blogToDelete!==null} onOpenChange={(open) => { if(!open) setBlogToDelete(null)}}>
        <AlertDialogContent className="w-[90vw] sm:w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => blogToDelete && handleDelete(blogToDelete)}
              disabled={isDeleted}
            >
              {isDeleted ? <LoaderAnim/> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Header */}
      <div className="p-4 sm:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">My Blogs</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage and organize your publishes blogs</p>
        </div>
        <Button className={'px-3! py-5! w-full sm:w-auto'} onClick={()=>{navigate('/write')}}>
          <Plus className="w-5! h-5!"/>
          <div>New Blogs</div>
        </Button>
      </div>

      {/* Tabs + Search + Filter */}
      <div className=" flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 sm:p-6 border-b">
        <div className="flex gap-3 sm:gap-5 overflow-x-auto">
          <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium shrink-0">All</button>
          <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium shrink-0">Published</button>
          <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium shrink-0">Drafts</button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
            <input type="text" placeholder="Search Blogs..." className="w-full sm:w-auto pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-black"/>
          </div>
          <button className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filters
          </button>

        </div>

      </div>

      {/* Table */}
       <div className="overflow-x-auto">
      <table className="table-fixed w-full min-w-[700px]">
        <thead>
          <tr className="text-sm font-semibold uppercase text-gray-500 border-b bg-gray-50">
                    <th className="w-[45%] px-6 py-4 text-left">Blog</th>
                    <th className="w-[15%] px-6 py-4 text-left">Status</th>
                    <th className="w-[15%] px-6 py-4 text-left">Date</th>
                    <th className="w-[10%] px-6 py-4 text-left">Likes</th>
                    <th className="w-[15%] px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-5">
                <div>

                <h3 className="font-semibold text-gray-900 truncate">
                  {blog.title}
                </h3>


              </div>
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center">

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusStyles["Published"]
                }`}
              >
                {"Published"}
              </span>
              </div>
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center text-gray-600">
              {(formatDate(blog.createdAt))}
            </div>
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center text-gray-600">
                  {blog._count.likes}
                </div>
              </td>

              <td className="px-6 py-5">
                {/* Buttons */}
                <div className="flex justify-center items-center gap-2">
              
              <Link to={`/blog/${blog.id}`}>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Eye size={16} />
                </button>
              </Link>
              <Link to={`/blog/edit/${blog.id}`}>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Pencil size={16} />
                </button>
              </Link>

              <button className="p-2 rounded-lg hover:bg-gray-100 text-red-500" onClick={()=> setBlogToDelete(blog.id)}>
                <Trash2 size={16} />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100">
                <MoreVertical size={16} />
              </button>

            </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-6">

        <p className="text-sm text-gray-500">
          Showing 1 to 5 of 12 blogs
        </p>

        <div className="flex gap-2">

          <button className="w-9 h-9 rounded-lg border">
            1
          </button>

          <button className="w-9 h-9 rounded-lg border hover:bg-gray-50">
            2
          </button>

          <button className="w-9 h-9 rounded-lg border hover:bg-gray-50">
            3
          </button>

        </div>

      </div>
    </div>
  );
}