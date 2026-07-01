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
} from "@/components/ui/alert-dialog";

import { Button } from './ui/button'
import { ChevronDown, Globe, ImagePlus, Lock, Sparkles } from 'lucide-react'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from './ui/dropdown-menu'
import { Input } from './ui/input'
import  LoaderAnim, { LoaderAnimWhite } from './LoaderAnim'
type Status = 'public' | 'private'
const statusConfig = {
    public:{
        icon: Globe,
        label:'Public',
        description:'Anyone can read this blog'
    },
    private:{
        icon:Lock,
        label:'Private',
        description:'Only visible to followers'
    }
}

type RightWriteProps ={
  onPublish:()=>void;
  isPublishing:boolean;
  onSuggestTitle:()=>void;
  isGeneratingTitles:boolean;
  onImprovedGrammar:()=>void;
  isImprovingGrammar: boolean;
}
const RightWrite = ({onPublish,isPublishing,onSuggestTitle,isGeneratingTitles,onImprovedGrammar,isImprovingGrammar}:RightWriteProps) => {
    
  return (
    <div className='p-4 sm:p-8'>
        <div className='flex flex-col font-inter'>
            <div className='font-semibold pb-5'>PUBLISH</div>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button className={'bg-black rounded-md py-5.5 mb-2 w-full'}>
              {isPublishing? <LoaderAnim/>:'Publish'}</Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-[90vw] sm:w-full max-w-md mx-auto"> 
                <AlertDialogHeader>
                  <AlertDialogTitle>Publish this blog?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your blog will be visible to everyone. Are you sure you want to publish?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                  <AlertDialogCancel className={'p-5'}>Cancel</AlertDialogCancel>
                  <AlertDialogAction className={'p-5'}onClick={onPublish}>
                    {isPublishing ? <LoaderAnim /> : "Publish"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {/* <Button onClick={onPublish} disabled={isPublishing} className={'bg-black rounded-md py-5.5 mb-2'}>
              {isPublishing? <LoaderAnim/>:'Publish'}</Button> */}
            
            
            <Button className={'py-5 rounded-md bg-white font-bold text-black border-r border-black hover:bg-gray-200'}>Save Draft</Button>

        </div>
        <div><hr className="h-px my-8 bg-gray-200 border-0"/></div>
        <div className="flex flex-row items-center gap-2 font-semibold pb-5 font-inter">
              <Sparkles className="h-4 w-4 text-black" /> 
              <div>AI ASSISTANT</div>
            </div>
            <div className="flex flex-col  gap-2">
            <Button onClick={onSuggestTitle} disabled={isGeneratingTitles} className={'py-5 rounded-md bg-black text-white border-r border-black hover:bg-slate-900 font-inter'}>{isGeneratingTitles?<LoaderAnim/> :"Suggest Title"}</Button>
            <Button
  onClick={onImprovedGrammar}
  disabled={isImprovingGrammar}
  className="py-5 rounded-md bg-white font-semibold text-black border border-black hover:bg-gray-200 font-inter"
>
  {isImprovingGrammar ? <LoaderAnimWhite /> : "Improve Grammar"}
</Button>
            </div>
        <div><hr className="h-px my-8 bg-gray-200 border-0"/></div>

        <div className='flex flex-col font-inter'>

            <div className='font-semibold pb-5'>STATUS</div>

            <div>
                <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium">Public</p>
                  <p className="text-xs text-muted-foreground">Anyone can read this blog</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64 max-w-[90vw]" align="start">
            <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer">
              <Globe className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-medium">Public</p>
                <p className="text-xs text-muted-foreground">Anyone can read this blog</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer">
              <Lock className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-medium">Private</p>
                <p className="text-xs text-muted-foreground">Only visible to followers</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
            </div>
        </div>
        <div><hr className="h-px my-8 bg-gray-200 border-0"/></div>
        <div className='flex flex-col font-inter'>
            <div className='font-semibold pb-5'>COVER IMAGE</div>
            <div className="w-full flex flex-col items-center justify-center gap-2 
                     rounded-lg border-2 border-dashed border-border 
                     bg-muted/40 py-6 sm:py-8 px-4">
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Upload cover image</p>
          <p className="text-xs text-muted-foreground">Recommended size: 1200x630</p>
        </div>
        </div>

        <div><hr className="h-px my-8 bg-gray-200 border-0"/></div>

        <div className='flex flex-col font-inter'>
            <div className='font-semibold pb-5'>TAGS</div>
            <Input placeholder='Add tags...' className='py-6 px-4'/>
            <div className='text-gray-400 mt-2 ml-2'>Use commas to add multiple tags</div>

        </div>

    </div>
  )
}

export default RightWrite