import "dotenv/config";
import { Hono } from 'hono'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { authMiddleware } from "../middleware/auth";


const aiRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    GEMINI_API_KEY: string
  },
  Variables: {
    userid: string
  }
}>()


aiRouter.post('/suggestTitle',authMiddleware,async(c)=>{
    const body = await c.req.json();
    if(!body.content || body.content.trim()=="<p></p>"){
        return c.json({message:"Content is Required"},400)
    }
    try{
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
        const model = genAI.getGenerativeModel({
            model:"gemini-2.5-flash"
        })

        const prompt = `You are an expert SEO blog editor.

Read the blog content and generate exactly 3 blog titles.

Requirements:
- Every title MUST accurately reflect ONLY the information present in the article.
- Do NOT introduce topics that are not discussed.
- Focus on the article's main idea.
- Titles should be SEO-friendly.
- They should accurately summarize the article.
- Title 1: SEO-friendly and descriptive.
- Title 2: Engaging and curiosity-driven.
- Title 3: Professional/editorial style.
- Keep them between 45 and 70 characters.
- Make them natural and engaging.
- Do not use clickbait.
- Prefer descriptive titles over poetic ones.
- Capitalize each major word.
- Return ONLY a valid JSON array of exactly 3 strings.
- No markdown.
- No explanation.



Blog:
${body.content.slice(0,3000)}`
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim()
        const titles = JSON.parse(text)
        return c.json({
            titles
        })
    } catch (error){
        console.log(error)
        return c.json({
            message:"Failed to generate titles"
        },500)
    }


})

aiRouter.post('/improveGrammar',authMiddleware,async(c)=>{
    const body = await c.req.json();
    if(!body.content || body.content.trim()==="<p></p>"){
        return c.json({
            message:"content required"
        },400)
    }

    try{
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
        const model = genAI.getGenerativeModel({
            model:"gemini-2.5-flash"
        })
        const prompt = `You are an expert English grammar editor.

Your task is to correct grammar, spelling, punctuation, sentence structure, and awkward phrasing while preserving the author's original meaning, tone, and writing style.

Rules:
- NEVER modify HTML tags.
- NEVER remove HTML tags.
- NEVER add HTML tags.
- NEVER change the HTML structure.
- NEVER rename, reorder, or delete any tag.
- Only modify the text between the tags.
- Preserve whitespace and formatting.
- Return ONLY valid HTML.
- Do not wrap the response in markdown.
- Do not return JSON.
- Ensure every HTML tag is properly opened and closed.
- Do NOT change the intent or meaning.
- Do NOT add new information.
- Do NOT remove important information.
- Improve readability only where necessary.
- Keep headings, bullet points, and formatting exactly as they are.
- Return only the corrected content.
- Do not include explanations, notes, markdown code blocks, or introductory text.

The input may contain HTML. Preserve all HTML tags exactly as they are and only improve the text inside them.

blog_content:${body.content}`
        const result = await model.generateContent(prompt);
        const content = result.response.text().trim()
        
        

        return c.json({
            content
        })
    }
    catch(error){
        return c.json({
            message:error
        },400)
    }
})

export default aiRouter