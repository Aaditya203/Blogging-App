import { Link, useNavigate } from 'react-router-dom'
import type {SignInSchema} from "../../../common/src/index"
import { useState } from 'react'
import { LabelledInput } from './LabelledInput'
import LoaderAnim from './LoaderAnim'
import { useAuth } from '@/context/AuthContext'
import { googleSignIn, signin } from '@/services/auth.service'
import { toast } from 'sonner'
import AuthHero from './AuthHero'
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
const SignInForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading,setLoading] = useState(false);
    const [postInput,setPostInput] = useState<SignInSchema>({
        email:"",
        password:""
    })
    const handleLogin = async ()=>{
        try{
            setLoading(true)
            const data =  await signin(
                 postInput.email,
                postInput.password
            )
            login(data.jwt,data.username,data.name,data.email);
            navigate("/dashboard")
        }catch(error:any){
            toast.error(error.message)
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 w-full">
        <AuthHero />
   

    <div className="flex justify-center items-center px-6">
           <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.6,
                ease: "easeOut"
            }}
        >
        <div className="w-full max-w-md">
        <div className='flex flex-col bg-white items-center justify-center w-full max-w-md whitespace-nowrap'>
            <div className='text-4xl font-bold  mb-2 px-6 font-fair'>Let's Get You Back In</div>
            <div className='text-md text-neutral-500 leading-7  mb-4 font-inter'>Don't Have An Account? <Link to={'/signup'} className='underline font-semibold'>Create</Link></div>
            <GoogleLogin 
            theme='filled_black'
            size="large"
            shape="square"
            width="300"
    onSuccess={async (credentialResponse) => {
        try {
            if (!credentialResponse.credential) return;

            const data = await googleSignIn(
                credentialResponse.credential
            );

            login(data.jwt, data.username,data.name,data.email);

            navigate("/dashboard");

        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Google Sign-In failed"
            );
        }
    }}
    onError={() => {
        toast.error("Google Login Failed");
    }}
/>
 <div className="relative flex items-center w-full my-4">
    <div className="flex-1 h-px bg-neutral-300" />

    <span className="px-4 bg-white text-sm text-neutral-500 font-medium">
        or
    </span>

    <div className="flex-1 h-px bg-neutral-300" />
</div>
                
                </div>
        <LabelledInput label='Email Address' type="email" placeholder='Enter Your Email' onchange={(e)=>{
            setPostInput({
                ...postInput,
                email: e.target.value
            })
        }}/>
        <LabelledInput label='Password' type='password' placeholder='Enter Your Password' onchange={(e)=>{
            setPostInput({
                ...postInput,
                password: e.target.value
            })
        }}/>
        <div className="mt-5 flex items-center justify-between">

  

        <span className="text-sm text-neutral-600 font-inter">
            Don't Remember Your Password?
        </span>

    

    <button
        className="text-sm text-black font-inter hover:underline"
    >
        Forgot password?
    </button>

</div>
        <button type="button" onClick={handleLogin} className="mt-7 w-full rounded-lg bg-black py-3.5  font-inter text-white transition-all duration-300 hover:bg-neutral-800 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60">
            {loading ? <LoaderAnim/> : "Sign In"}
        </button>

        </div>
        </motion.div>
    </div>
    </div>

  )
}



export default SignInForm