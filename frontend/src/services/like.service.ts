import api from "@/lib/axios"

export const doLike = async (postid:string)=>{
    const response = await api.post('/like/doLike',{
        post_id:postid
    })
    return response.data;
}
export const unLike = async (postid:string)=>{
    const response = await api.delete('/like/unlike',{
        data:{
            post_id:postid
        }
    })
    return response.data;
}