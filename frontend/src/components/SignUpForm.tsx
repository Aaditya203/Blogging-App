import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LabelledInput } from './LabelledInput'
import LoaderAnim from './LoaderAnim'
import { signup } from '@/services/auth.service'
import { useAuth } from '@/context/AuthContext'
import AuthHero from "./AuthHero";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { googleSignIn } from "@/services/auth.service";
import { toast } from "sonner";
import { checkUsername } from '@/services/auth.service'

const SignUpForm = () => {
    const { login } = useAuth();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUserName] = useState("");
    const [usernameStatus,setUserNameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
    const [usernameMessage,setUserNameMessage] = useState("");
    
    useEffect(()=>{
        if(username.trim().length < 3){
            setUserNameStatus("idle");
            setUserNameMessage("");
            return;
        }

        const timer = setTimeout(async()=>{
            try{
                setUserNameStatus("checking");
                const data = await checkUsername(username);
                if(data.available){
                    setUserNameStatus("available");
                }
                else{
                    setUserNameStatus("taken")
                }
                setUserNameMessage(data.message)
            }
            catch{
                setUserNameStatus("idle")
                setUserNameMessage("");
            }
        },500);
        return ()=> clearTimeout(timer);
    },[username])

    async function handleSubmit(){
        try{
            setLoading(true);
            const data = await signup(
                name,
                username,
                password,
                email
            )
            login(data.jwt,username,name,email);
            navigate("/dashboard")
        }
        catch(e:any){
            alert(e.response.data.message);
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
        <div className='flex flex-col bg-white items-center justify-center w-full whitespace-nowrap'>
                <div className="text-4xl font-bold mb-2 px-6 font-fair">
        Create Your Account
    </div>

    <div className="text-md text-neutral-500 leading-7 mb-4 font-inter">
        Already have an account?{" "}
        <Link
            to="/signin"
            className="underline font-semibold"
        >
            Sign In
        </Link>
    </div>
    <GoogleLogin
    theme="filled_black"
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
       <div className="relative flex items-center w-full mt-8">
    <div className="flex-1 h-px bg-neutral-300" />

    <span className="px-4 bg-white text-sm text-neutral-500 font-medium">
        or
    </span>

    <div className="flex-1 h-px bg-neutral-300" />
</div>
        <LabelledInput label='Username' placeholder='Enter Your UserName' status={usernameStatus}
  message={usernameMessage} onchange={(e)=>{
               setUserName(e.target.value);
            }}/>  
        <LabelledInput label='Name' placeholder='Enter Your Name' onchange={(e)=>{
                setName(e.target.value);
                
            }}/>  
        <LabelledInput label='Email' type="email" placeholder='Enter Your Email' onchange={(e)=>{
            setEmail(e.target.value)
        }}/>
        <LabelledInput label='Password' type='password' placeholder='Enter Your Password' onchange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <button disabled={
    loading ||
    usernameStatus === "checking" ||
    usernameStatus === "taken"
  } onClick={handleSubmit} type="button" className="mt-7
w-full
rounded-lg
bg-black
py-3.5
font-inter
text-white
transition-all
duration-300
hover:bg-neutral-800
hover:-translate-y-0.5
active:translate-y-0
disabled:opacity-60
disabled:cursor-not-allowed">
            {loading ? <LoaderAnim/> : "Sign Up"}
        </button>

        </div>
        </motion.div>
    </div>
    </div>
  )
}



export default SignUpForm