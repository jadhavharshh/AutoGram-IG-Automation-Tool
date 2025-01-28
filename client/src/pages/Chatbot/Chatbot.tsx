import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { apiClient } from "@/lib/api-client"
import { SCRAPE_API } from "@/utils/constants"

const Chatbot = () => {
  const startScraperFunction = async () => {
    const response = await apiClient.post(SCRAPE_API, {}, {withCredentials: true});
    console.log("Response", response);
    console.log("DONE SCRAPING");
  };

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
              <BreadcrumbPage className="">Chatbot</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <ModeToggle />
      </div>
    </div>
  </header>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="w-full h-full">
      <Button onClick={startScraperFunction}>Start Function</Button>

      </div>
    </div>
  </div>
  </SidebarInset>
    </SidebarProvider>
    </div>
  )
}

export default Chatbot