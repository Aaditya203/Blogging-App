
import DOMPurify from 'dompurify'
import { Heart } from 'lucide-react';

interface BlogCardProps {
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    likeCount :number;
}
export const BlogCard = ({authorName,title,content,publishedDate,likeCount}:BlogCardProps) => {
  return (
  <div
    className="group border-b border-gray-200 rounded-xl px-4 sm:px-6 py-5 sm:py-7 cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:-translate-y-1">
        <div className='font-inter flex flex-col gap-2'>
            <div className='flex justify-between gap-y-2'>
            <div className='flex flex-wrap gap-2 items-center pb-2 text-sm sm:text-base'>
                <div><Avatar name={authorName}/></div>
                <div className=''>{authorName}</div>
                <div className='h-1 w-1 bg-slate-500 rounded-full'></div>
                <div className='text-slate-500'>{publishedDate}</div>
            </div>
            <div className='flex gap-3 items-center'>
                <Heart/>
                <div>{likeCount}</div>
            </div>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight transition-colors duration-300 group-hover:text-gray-700 font-fair">{title}</div>
            <div className='line-clamp-2 text-base sm:text-lg text-gray-500' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}/>
            <div className='bg-gray-200 text-gray-600 text-xs rounded-lg w-fit px-1.5 py-1'>{`${Math.ceil(content.replace(/<[^>]*>/g, "").split(" ").length/100)} min read`}</div>
        </div>
    </div>
  )
}
const BlogCardSkeleton = () => {
    return (
        <div className="border-b border-gray-200 py-5 sm:py-8 animate-pulse">

            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-gray-200" />
                <div className="w-28 sm:w-40 h-4 bg-gray-200 rounded" />
            </div>

            <div className="h-8 w-3/4 rounded bg-gray-200 mb-5" />

            <div className="space-y-2 mb-5">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>

            <div className="w-24 h-7 bg-gray-200 rounded-full" />

        </div>
    );
};

export default BlogCardSkeleton;

export function getAvatarInitials(name: string): string {
  if(!name){
    return "?"
  }
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return (
    words[0][0] +
    words[1][0]
  ).toUpperCase();
}

export function Avatar({name}:{name:string}){
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-black rounded-full">
            <span className="font-medium text-xs text-white">{getAvatarInitials(name)}</span>
        </div>
}