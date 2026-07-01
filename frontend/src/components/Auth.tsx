import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const Auth = ({type}:{type : "signup" | "signin"}) => {
    
  return (
    <div className='flex justify-center items-center flex-col h-screen font-mono'>
         {type === "signin" ? <SignInForm /> : <SignUpForm />}
    </div>
  )
}



export default Auth