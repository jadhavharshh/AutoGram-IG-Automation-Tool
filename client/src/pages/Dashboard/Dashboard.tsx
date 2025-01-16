import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Chart1 } from "./components/Chart1"
import { Chart2 } from "./components/Chart2"
import { Chart3 } from "./components/Chart3"

const Dashboard = () => {
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
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ModeToggle />
      </div>
    </div>
  </header>
  <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div className="w-full h-full">
      <Chart1 />
    </div>
    <div className="w-full h-full">
      <Chart2 />
    </div>  
    <div className="w-full h-full">
      <Chart3 />
    </div>  
  </div>
</div>
</SidebarInset>

    </SidebarProvider>
    </div>
  );
}

export default Dashboard;
