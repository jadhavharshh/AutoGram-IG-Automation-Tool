import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client"
import { SEND_OTP_API, VERIFY_OTP_API } from "@/utils/constants"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setOtpSent(true)
      // const response = await apiClient.post("/send-ito", { email }, { withCredentials: true })
      // if (response.status === 200) {
      //   toast.success('OTP has been sent to your email.')
      // s}
      const response = await apiClient.post(SEND_OTP_API, { email }, { withCredentials: true })
      console.log(response)
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        console.log(error)
        toast.error('An unexpected error occurred')
      }
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await apiClient.post(VERIFY_OTP_API, { email, otp }, { withCredentials: true })
      if (response.status === 200) {
        toast.success('OTP verified successfully. You can now reset your password.')
        // Redirect or allow password reset
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        console.log(error)
        toast.error('An unexpected error occurred')
      }
    }
  }

  
  return (
    <>
      <form className={cn("flex flex-col gap-4")} onSubmit={otpSent ? handleVerifyOTP : handleSendOTP}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{otpSent ? "Verify OTP" : "Forgot Password"}</h1>
          <p className="text-balance text-sm text-muted-foreground">
            {otpSent
              ? "Enter the OTP sent to your email."
              : "Enter your email to receive an OTP for password reset."}
          </p>
        </div>
        <div className="grid gap-6">
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {otpSent && (
            <div className="flex flex-col gap-2 items-start">
              <Label htmlFor="otp">OTP</Label>
              <InputOTP
                id="otp"
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
          <Button type="submit" className="w-full">
            {otpSent ? "Verify OTP" : "Send OTP"}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <Button variant="outline" className="w-full">
            Back to Login
          </Button>
        </div>
        <div className="text-center text-sm">
          <a
            href="#"
            className="underline underline-offset-4"
            onClick={onBack}
          >
            Back to Login
          </a>
        </div>
      </form>
    </>
  )
  
}