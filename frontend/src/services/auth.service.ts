import api from "@/lib/axios";

export const signup = async ( name:string, username:string,password:string,email:string)=>{
    const response = await api.post("/user/signup",{
        name:name,
        email:email,
        username:username,
        password:password
    });
    return response.data;
}

export const signin = async (email:string,password:string)=>{
    try{const response = await api.post("/user/signin",{
        email:email,
        password:password
    })
    return response.data
    }
    catch(error:any){
        throw new Error(
            error.response?.data?.message
        )
    }
}

export const googleSignIn = async(credential:string)=>{
    const response = await api.post("/user/google",{
        credential
    });
    return response.data;
}

export const checkUsername = async(username:string)=>{
    const response = await api.get(`/user/check-username/${username}`);
    return response.data;
}

export const getProfileDetails = async()=>{
    const response = await api.get('/user/profileDetails');
    return response.data.data;
}
export const updateProfileDetails = async(name:string,bio:string,country:string,portfolio:string)=>{
    const response = await api.put('/user/updateProfile',{
        name:name,
        bio:bio,
        country:country,
        portfolio:portfolio
    });
    return response.data;
}