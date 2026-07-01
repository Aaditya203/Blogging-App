import  { useState } from 'react'
import LeftWrite from '../components/LeftWrite'
import NavBar from '@/components/NavBar'
import RightWrite from '@/components/RightWrite'
import { toast } from 'sonner'
import { createPost } from '@/services/blog.service'
import { useAuth } from '@/context/AuthContext'
import {  useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { improveGrammar, suggestTitle } from '@/services/ai.service'
import TitleSuggestionDialog from '@/components/TitleSuggestionDialog'
import { GrammarDialog } from '@/components/GrammarDialog'
const Write = () => {
  const {token} = useAuth();
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [isPublishing,setIsPublishing] = useState(false);
  const [suggestedTitles,setSuggestedTitles] = useState<string[]>([]);
  const [isSuggestDialogOpen,setIsSuggestDialogOpen] = useState(false);
  const [isGeneratingTitles,setIsGeneratingTitles] = useState(false);
  const [isGrammarDialogOpen,setIsGrammarDialogOpen] = useState(false);
  const [improvedGrammar,setImprovedGrammar] = useState("");
  const [isImprovingGrammar,setIsImprovingGrammar] = useState(false);
  const handlePublish = async ()=>{
    if(!token){
      navigate('/signin');
      return;
    }
    if(!title.trim()){
      toast.error("Title Is Required")
      return;
    }
    
    if(!content || content==="<p></p>"){
      toast.error("Content Is Required")
      return;
    }
    try{
      setIsPublishing(true);
       await createPost(title,DOMPurify.sanitize(content))
      toast.success("Blog Created Successfully")
      navigate('/dashboard')
    }catch(error:any){

      if(error.response?.status===401){
        logout()
        navigate('/signin')
      }

      console.log(error);
      toast.error("Failed to Publish")
    }finally{
      setIsPublishing(false)
    }
  }

  const handleSuggestTitle = async()=>{
    if(!token){
      navigate('/signin')
      return
    };
    if(!content || content.trim()==="<p></p>"){
      toast.error("Content Required")
      return ;
    }
    try{
      setIsGeneratingTitles(true);

      const response = await suggestTitle(content);
      setSuggestedTitles(response.titles)
      setIsSuggestDialogOpen(true);

    }
    catch{
      toast.success("Some Error Occurred!")
      return;
    }
    finally{
      setIsGeneratingTitles(false)
    }
  }
  const handleImproveGrammar = async()=>{
    if(!token){
      navigate('/signin')
      return
    };
    if(!content || content.trim()==="<p></p>"){
      toast.error("Content Required")
      return ;
    }
    try{
      setIsImprovingGrammar(true);

      const response = await improveGrammar(content);
      setImprovedGrammar(response.content)
      setIsGrammarDialogOpen(true);
    }
    catch{
      toast.success("Some Error Occurred!")
      return;
    }
    finally{
      setIsImprovingGrammar(false);
    }
  }

  return (
    <div>
      <div><NavBar/></div>
     <div className="flex flex-col lg:flex-row flex-1 overflow-hidden pt-4">
        
        {/* Left — editor */}
        <div className="w-full lg:w-4/5 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 overflow-hidden">
          <LeftWrite content={content} onTitleChange={setTitle} onContentChange={setContent} title={title}/>
        </div>

        {/* Right — sidebar */}
        <div className="w-full lg:w-1/5 overflow-y-auto">
          <RightWrite onPublish={handlePublish} isPublishing={isPublishing} onSuggestTitle={handleSuggestTitle} isGeneratingTitles={isGeneratingTitles} isImprovingGrammar={isImprovingGrammar} onImprovedGrammar={handleImproveGrammar}/>
        </div>

      </div>
      <TitleSuggestionDialog
    open={isSuggestDialogOpen}
    onOpenChange={setIsSuggestDialogOpen}
    titles={suggestedTitles}
    onSelect={(title) => {
        setTitle(title);
    }}
/>
      <GrammarDialog 
    open={isGrammarDialogOpen}
    onOpenChange={setIsGrammarDialogOpen}
    improvedContent={improvedGrammar}
    onAccept={() => {
        setContent(improvedGrammar);
        setIsGrammarDialogOpen(false);
    }}
/>
    </div>

  )
}

export default Write