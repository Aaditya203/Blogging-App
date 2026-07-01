import React, { useRef, useState } from 'react'
import { ArrowLeft, ArrowLeftToLine } from 'lucide-react'

import Tiptap from './TipTap';
import { Link } from 'react-router-dom';

type LeftWriteProps = {
  title:string
  onTitleChange:(val:string) => void,
  onContentChange:(val:string) => void,
  content:string
}

const LeftWrite = ({title,onTitleChange,onContentChange,content}:LeftWriteProps) => {
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTitleChange(e.target.value)
    // Auto-resize on every keystroke
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }
  return (
    <div className='p-4 sm:p-8'>
        <Link to={'/dashboard'}>
        <div className='flex items-center gap-2 text-gray-600 ml-0 sm:ml-8  text-sm sm:text-lg'>
            <ArrowLeft size={17}/>
            <div className='font-inter'>Back to blogs</div>
        </div>
        </Link>
        <div className="shrink-0 px-4 sm:px-8 py-5">
        <textarea
          ref={titleRef}
          placeholder="Add a title..."
          value={title}
          onChange={handleTitleChange}
          rows={1}
          className="w-full resize-none overflow-hidden bg-transparent border-none outline-none 
                     text-2xl sm:text-4xl font-bold placeholder:text-gray-300 text-gray-800
                     dark:text-white dark:placeholder:text-gray-600
                     leading-tight font-fair"
        />
      </div>
        <div className="px-0 sm:px-6 mt-6">
        <Tiptap content={content} onChange={onContentChange}/>
      </div>
    </div>
  )
}

export default LeftWrite