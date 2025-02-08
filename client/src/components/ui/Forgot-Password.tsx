import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client"
import { RESET_PASSWORD_API, SEND_OTP_API, VERIFY_OTP_API } from "@/utils/constants"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resetScreen, setResetScreen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(SEND_OTP_API, { email, type: 'resetPassword' }, { withCredentials: true });
      setOtpSent(true);
      toast.success('OTP sent successfully.');
      console.log(response);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(VERIFY_OTP_API, { email, otp, type: 'resetPassword' }, { withCredentials: true });
      if (response.status === 200) {
        setResetScreen(true);
        toast.success('OTP verified successfully. You can now reset your password.');
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, newPassword, confirmPassword);

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    try {
      const response = await apiClient.post(RESET_PASSWORD_API, { email, newPassword , confirmPassword }, { withCredentials: true });
      if (response.status === 200) {
        toast.success('Password reset successfully. You can now log in with your new password.');
        // Optionally redirect to login
        onBack();
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      {!resetScreen ? (
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
            <Button variant="outline" className="w-full" onClick={onBack}>
              Back to Login
            </Button>
          </div>
        </form>
      ) : (
        <form className={cn("flex flex-col gap-4")} onSubmit={handleResetPassword}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your new password below.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="flex flex-col gap-2 items-start">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
            <Button variant="outline" className="w-full" onClick={onBack}>
              Back to Login
            </Button>
          </div>
        </form>
      )}
    </>
  );
}