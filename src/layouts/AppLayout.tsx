import { Link, Outlet } from "react-router";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/components/AppSidebar";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { FolderProvider } from "@/context/FolderContext";
import { useTheme } from "@/context/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
export default function AppLayout() {
  const { data } = useGetCurrentUser();
  if (!data) {
    return (
      <div className="mt-20 flex flex-col items-center space-y-5 font-bold text-2xl">
        <p>please Login to continue</p>
        <Button variant="default" asChild>
          <Link to="/auth/login" viewTransition>
            Login
          </Link>
        </Button>
      </div>
    );
  }
  const folderName = data.user.$id;
  const { theme, setTheme } = useTheme();

  return (
    <FolderProvider folderName={folderName}>
      <SidebarProvider>
        <TooltipProvider delayDuration={500} disableHoverableContent>
          <AppSidebar collapsible="icon" variant="sidebar" />
          <SidebarInset>
            <header className="flex items-center p-2 border-b justify-between">
              <div className="flex items-center">
                <SidebarTrigger className="mr-2 " />
                <h1 className="font-semibold text-lg">Dashboard</h1>
              </div>
              <div className="mr-5">
                <Button
                  className="cursor-pointer relative w-10 h-10 grid place-items-center overflow-hidden rounded-full"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <Moon
                    className={`absolute ${
                      theme === "dark" ? "translate-y-0" : "-translate-y-15"
                    } transition-all duration-300`}
                  />
                  <Sun
                    className={`absolute ${
                      theme === "light" ? "translate-y-0" : "translate-y-15"
                    } transition-all duration-300`}
                  />
                </Button>
              </div>
            </header>
            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </main>
          </SidebarInset>
        </TooltipProvider>
      </SidebarProvider>
    </FolderProvider>
  );
}
