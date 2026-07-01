import api from "@/lib/axios";

export const createPost = async (title:string, content:string)=>{
    const response = await api.post('/blog/create',{
        title:title,
        content:content
    })
    return response.data
}

export const getBlogById = async(id:string)=>{
    const response = await api.get(`/blog/${id}`)
    return response;
}

export const getBlogBulk = async ()=>{
    const response = await api.get('/blog/bulk');
    return response.data;
}
export const getMyBlogs = async ()=>{
    const response = await api.get('/blog/my');
    return response.data;
}
export const deleteBlog = async (id:string)=>{
    const response = await api.delete(`/blog/${id}`);
    return response.data;
}

export const updateBlog = async(id:string,title:string,content:string) => {
    const response = await api.put(`/blog/${id}`,{
        title:title,
        content:content
    });
    return response.data;
    
}
