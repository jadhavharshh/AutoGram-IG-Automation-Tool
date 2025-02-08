import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const SendMessages = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
            <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
  <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div className="flex items-center gap-2 px-4 w-full">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      {/* Container for Breadcrumb and ModeToggle */}
      <div className="flex justify-between items-center w-full">
        <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbPage className="">Message Sender</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <ModeToggle />
      </div>
    </div>
  </header>
  </SidebarInset>

    </SidebarProvider>
    </div>
  )
}

export default SendMessages