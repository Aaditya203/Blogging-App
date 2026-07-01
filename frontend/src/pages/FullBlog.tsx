
import AuthorCard from '@/components/AuthorCard'
import { getAvatarInitials } from '@/components/BlogCard'
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { addHeadingIds, extractHeadings, formatDate } from '@/lib/utils'
import { getBlogById } from '@/services/blog.service'
import { ArrowLeft,  ArrowUp,  Heart, UserPlus } from 'lucide-react'
import  { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import DOMPurify from 'dompurify'
import { doLike, unLike } from '@/services/like.service'
const FullBlog = () => {
    const {id} = useParams<{id:string}>();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [showTopButton,setShowTopButton] =useState(false)
    const [headings,setHeadings] = useState<{id:string,text:string,level:number}[]>([]);

    const [authorName,setAuthorName]=useState("");
    const [authorUserName,setAuthorUserName]=useState("");
    const [authorBio,setAuthorBio]=useState("");
    const [createdAt,setCreatedAt] = useState("");
    const {token} = useAuth();
    const [hasLiked,setHasLiked] = useState(false);
    const [likes,setLikes] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        const handleScroll = ()=>{
            setShowTopButton(window.scrollY > 400);
        };

        window.addEventListener("scroll",handleScroll);

        return ()=>{
            window.removeEventListener("scroll",handleScroll)
        }
    },[])


    useEffect(()=>{
        async function getBlog(){
            if(!token){
                navigate('/signin');
                return;
            }
            if(!id){
                navigate('/dashboard')
                return;
            }
           try{ 
                const response = await getBlogById(id);

                setTitle(response.data.blogs.title);
                setAuthorName(response.data.blogs.author.name);
                setAuthorUserName(response.data.blogs.author.username);
                setAuthorBio(response.data.blogs.author.bio);
                setCreatedAt(response.data.blogs.createdAt);
                setLikes(response.data.blogs.likesCount)
                setHasLiked(response.data.blogs.hasLiked)


                const htmlWithIds = addHeadingIds(response.data.blogs.content);

                setContent(htmlWithIds);
                setHeadings(extractHeadings(htmlWithIds));
              }
              catch(error){
                console.log(error);
                toast.error("Some error occured")
                return;
            }
        }
        getBlog();
    },[])

    const handleLike = async function(){
        if(!token){
            navigate('/signin');
            return;
        }
        if(!id){
                navigate('/dashboard')
                return;
            }
        const previousState = hasLiked;
        setHasLiked(prev => !prev);
        setLikes(prev => hasLiked ? prev - 1 : prev + 1);

        try{
           if(previousState){
            await unLike(id);
            toast.success("Unliked")
           }
           else{
            await doLike(id);
            toast.success("Liked")
           }
            
        }
        catch{
            setHasLiked(previousState);
            setLikes(prev => previousState ? prev + 1 : prev - 1);
            toast.error("Some Error Occurred");
            return
        }
    }
    
    const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  return (
    <div>
        <NavBar/>
        <div className='flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8'>
            {/* Left Section */}
            <div className='w-full lg:w-4/5 border-b border-gray-200 lg:border-b-0 lg:border-r pb-8 lg:pb-0'>
                <Link to={'/dashboard'}>
                <div className='flex items-center gap-2 text-gray-600 ml-2 sm:ml-4 lg:ml-8 mb-5 hover:text-black cursor'>
                    <ArrowLeft size={17}/>
                    <div className='font-inter'>Back to blogs</div>
                </div>
                </Link>
                <div className=' border-b border-gray-200 pb-7 flex flex-col sm:flex-row gap-5 sm:gap-0 ml-2 sm:ml-6 lg:ml-12 items-start sm:items-center justify-between pt-2'>
                    <div className='flex flex-row gap-4 items-center'>
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black text-white font-semibold font-inter">{
                        getAvatarInitials(authorName)}
                        </div>

                        <div className='flex flex-col font-inter'>
                            <div className='font-semibold text-base sm:text-lg'>{authorName}</div>
                            <div className='text-gray-500 font-medium tracking-wide'>@{authorUserName}</div>
                            <div className='text-gray-500 text-sm'>{formatDate(createdAt)}  . {`${Math.ceil(content.replace(/<[^>]*>/g, "").split(" ").length/100)} minute read`}</div>

                        </div>

                    </div>
            <div className='flex flex-row flex-wrap items-center gap-3 sm:gap-6 lg:gap-10 pr-0 sm:pr-4 lg:pr-8 w-full sm:w-auto'>
               
<Button
    variant="outline"
    onClick={handleLike}
    className={`
        rounded-lg
        px-4
        sm:px-6
        py-3
        sm:py-5
        shadow-sm
        flex
        items-center
        gap-3
        transition-all
        duration-200
        hover:shadow-md
        hover:scale-105
        ${
            hasLiked
                ? "bg-red-50 border-red-300 text-red-500"
                : "bg-white"
        }
    `}
>
    <Heart
        fill={hasLiked ? "currentColor" : "none"}
        className="w-5 h-5 transition-all duration-200"
    />

    <span className="font-semibold">
        {likes}
    </span>
</Button>

                <div>
                    <Button className={'flex flex-row px-4 sm:px-6 py-3 sm:py-5 font-inter text-sm sm:text-md gap-3 sm:gap-4'}>
                        <div><UserPlus className='w-4! h-4! sm:w-5! sm:h-5!'/></div>
                        <div>Follow</div>
                    </Button>
                </div>
            </div>
            </div>

            <div className='font-fair w-full resize-none overflow-hidden bg-transparent border-none outline-none 
                     text-2xl sm:text-3xl lg:text-4xl font-bold placeholder:text-gray-300 text-gray-800
                     dark:text-white dark:placeholder:text-gray-600
                     leading-tight pl-2 sm:pl-8 lg:pl-14 pt-5'>{title}</div>
            <div className='prose dark:prose-invert max-w-none pl-2 sm:pl-8 lg:pl-14 pt-6 sm:pt-8 lg:pt-10 pr-2 sm:pr-6 lg:pr-9 text-justify' dangerouslySetInnerHTML={{
                __html:DOMPurify.sanitize(content)
            }}/>
            </div>


            {/* Right Section */}
            <div className='w-full lg:w-1/5 pt-8 mt-8 lg:mt-0 font-inter'>
            <div className='flex flex-col pl-2 sm:pl-4 lg:pl-7'>
                <div className='font-semibold text-md'>TABLE OF CONTENTS</div>

                <div className='flex flex-col gap-2 pt-5'>
                    {headings.map((heading)=>(
                        <a key={heading.id} href={`#${heading.id}`} className={`text-sm text-gray-600 hover:text-black transition-colors ${heading.level === 1 ? "" : ""}
                        ${heading.level === 2 ? "pl-3" : ""}
                        ${heading.level === 3 ? "pl-6" : ""}
                        ${heading.level === 4 ? "pl-9" : ""}
                         `}>{heading.text}</a>
                    ))}

                </div>

                <div><hr className="h-px my-8 bg-gray-200 border-0"/></div>
                <div className='font-inter font-semibold'>ABOUT THE AUTHOR</div>
                <div className='pt-5'>
                    <AuthorCard name={authorName} username={authorUserName} bio = {authorBio}/>
                </div>
            </div>
            </div>
        </div>
        <div>{showTopButton && (
            <Button onClick={scrollToTop} className={'fixed bottom-4 right-4 sm:bottom-8 sm:right-8 px-3 py-5 sm:py-7 rounded-full hover:scale-110 transition'}><ArrowUp className='w-6! h-6! sm:w-8! sm:h-8!'/></Button>
        )}</div>
    </div>
  )
}

export default FullBlog


