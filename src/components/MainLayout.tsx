
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div 
          className={cn(
            "h-screen flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden",
            isSidebarOpen ? "w-64" : "w-0"
          )}
        >
          {isSidebarOpen && <Sidebar />}
        </div>
        
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <div className="flex-1 relative">
            <button 
              onClick={toggleSidebar}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "absolute top-4 left-4 z-50"
              )}
            >
              {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            <div className="p-4 md:p-6 h-full overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
