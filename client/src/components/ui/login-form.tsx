import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client"
import { LOGIN_API, SIGNUP_API } from "@/utils/constants"
import { useNavigate } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate(); 
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignUp = async () => {
    const isValid = await validateSignUp();
    if(isValid){
      try {
        const response = await apiClient.post(SIGNUP_API, {email , password , confirmPassword},{withCredentials:true})
        // console.log('response', response)
        if(response.status === 201){
          toast.success('Account created successfully')
        }
        if(response.status === 400){
          toast.error(response.data.message)
        }
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
            toast.error('An unexpected error occurred');
        }
    }
    }
  }

  const handleLogin = async () => {
    try {
      if(!email || !password){
        toast.error('All fields are required');
        return;
      }
      const response = await apiClient.post(LOGIN_API, {email , password},{withCredentials:true})
      console.log('response', response)
      if(response.status === 200){
        toast.success('Login successful')
        navigate("/dashboard")
      }
      
    } catch (error : any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
          toast.error('An unexpected error occurred');
      }
    }
  };
  const validatePassword = (password : string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,}$/;
  
    if (!passwordRegex.test(password)) {
      return false;
    }
    return true;
  }

  
  const validateSignUp = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      toast.error('All fields are required');
      return false;
    }
    
    if (!validatePassword(password)) {
      toast.error('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long');
      return false;
    }
  
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
  
    return true;
  }
  


  return (
    <form className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{isSignUp ? "Create your account" : "Login to your account"}</h1>
        <p className="text-balance text-sm text-muted-foreground">
        {isSignUp
            ? "Enter your details below to create an account."
            : "Enter your email below to login to your account."}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-2 items-start">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" value={email} required onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {!isSignUp && (
                <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            )}
          </div>
          
          <Input id="password" type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        {isSignUp && (
          <div className="gap-2 flex flex-col items-start">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} required onChange={(e)=> setConfirmPassword(e.target.value)}/>
          </div>
        )}
        
        <Button type="submit" className="w-full" onClick={isSignUp ? handleSignUp : handleLogin}>
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full" >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          {isSignUp ? "Sign Up with Google" : "Login with Google"}
        </Button>
      </div>
      <div className="text-center text-sm">
      {isSignUp ? (
            <>
              Already have an account?{" "}
              <a
                href="#"
                className="underline underline-offset-4"
                onClick={() => setIsSignUp(false)}
              >
                Login
              </a>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <a
                href="#"
                className="underline underline-offset-4"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </a>
            </>
          )}
      </div>
    </form>
  )
}
