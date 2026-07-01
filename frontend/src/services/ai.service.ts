import api from "@/lib/axios"

export const suggestTitle = async(content:string)=>{
    const response = await api.post('/ai/suggestTitle',{
        content:content
    })
    return response.data;
}
export const improveGrammar = async(content:string)=>{
    const response = await api.post('/ai/improveGrammar',{
        content:content
    })
    return response.data;
}