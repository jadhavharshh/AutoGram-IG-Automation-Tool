import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiClient } from "@/lib/api-client"
import { ADD_INSTAGRAM_PROFILE, GET_INSTAGRAM_PROFILES } from "@/utils/constants"



import { useState , useEffect } from 'react'
import { toast } from "sonner"

export function DialogDemo() {
  const [igUsername, setIgUsername] = useState("")
  const [igPassword, setIgPassword] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchIgAccounts();
  }, []);
  const fetchIgAccounts = async () => {
    try {
      const response = await apiClient.get(GET_INSTAGRAM_PROFILES, {withCredentials: true})      
      console.log(response)
    } catch (error: any) {
      if(error.response && error.response.data){
        toast.error(error.response.data.message)
        console.log("Error Message:", error.response.data.message)
      }
    }

  };
  const handleIGAccount = async (e: any) => {
    e.preventDefault()
    if(ValidateIgInputs()){
      try {
        console.log("STILL IN HANDLEIGACCOUNT")
        const response = await apiClient.post(ADD_INSTAGRAM_PROFILE, { igUsername, igPassword }, { withCredentials: true })
        console.log(response)
        setIgUsername("")
        setIgPassword("")
        setIsOpen(false)
        toast.success("Instagram account added successfully")
      } catch (error : any) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message)
          console.log("Error Message:", error.response.data.message)
        } else {
          console.log("Unexpected Error:", error)
        }
      }
    }
  }

  const ValidateIgInputs = () => {
    if (igUsername === "" || igPassword === "") {
      toast.error("Please fill in all fields")
      return false
    }
    if (/\s/.test(igUsername)) {
      toast.error("Username cannot contain spaces");
      return false;
    }
    return true
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleIGAccount}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="igUsername" className="text-right">
                IG Username
              </Label>
              <Input
                id="igUsername"
                value={igUsername}
                onChange={(e) => setIgUsername(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="igPassword" className="text-right">
                Password
              </Label>
              <Input
                type="password"
                id="igPassword"
                value={igPassword}
                onChange={(e) => setIgPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}