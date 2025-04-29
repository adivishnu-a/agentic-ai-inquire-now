
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Desktop Sidebar */}
        <div 
          className={cn(
            "h-screen flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden hidden sm:block",
            isSidebarOpen ? "w-64" : "w-0"
          )}
        >
          {isSidebarOpen && <Sidebar />}
        </div>
        
        {/* Mobile Sidebar as Drawer */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="w-[280px] p-0 sm:hidden">
            <Sidebar />
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <div className="flex-1 relative">
            {/* Desktop sidebar toggle */}
            <button 
              onClick={toggleSidebar}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "absolute top-4 left-4 z-50 hidden sm:flex"
              )}
            >
              {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            
            {/* Mobile sidebar trigger */}
            <SheetTrigger 
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "absolute top-4 left-4 z-50 sm:hidden"
              )}
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            
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
