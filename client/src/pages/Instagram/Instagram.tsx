import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DataTableDemo } from "./components/DataTable";
import { useEffect } from "react";
import useStore from "@/store/store";

const Instagram = () => {
  const igAccounts = useStore((state) => state.igAccounts);
  const fetchIgAccounts = useStore((state) => state.fetchIgAccounts);

  useEffect(() => {
    console.log("Instagram component mounted and calling fetchIgAccounts");
    fetchIgAccounts();
  }, [fetchIgAccounts]);

  useEffect(() => {
    console.log("Instagram component - igAccounts:", igAccounts);
  }, [igAccounts]);

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
                    <BreadcrumbPage className="">
                      Add Instagram Accounts
                    </BreadcrumbPage>
                  </BreadcrumbList>
                </Breadcrumb>
                <ModeToggle />
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className=" gap-4">
              <DataTableDemo data={igAccounts} />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Instagram;
