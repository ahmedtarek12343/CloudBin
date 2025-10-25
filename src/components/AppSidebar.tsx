import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SIDEBAR_LINKS } from "@/constants";
import { Logo } from "../../public/assets/logo";
import { FolderPlusIcon, PlusIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { NavUser } from "./NavUser";
import UploadFile from "./UploadFile";
import { NewFolder } from "./NewFolder";
const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { state } = useSidebar();
  const location = useLocation();
  const [openUpload, setOpenUpload] = useState(false);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader>
          <Link to="/home">
            <Logo
              variant="icon"
              className={cn(state === "collapsed" ? "size-8" : "size-10")}
            />
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-2 mt-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size={state === "collapsed" ? "icon" : "default"}
                    className={`${cn(
                      state === "collapsed" && "size-8"
                    )} cursor-pointer `}
                  >
                    <PlusIcon />
                    {state === "expanded" && "New"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="right"
                  className="w-52 bg-muted"
                >
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setOpenCreateFolder(true)}
                  >
                    <FolderPlusIcon className="mr-2 size-4" />
                    Create Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setOpenUpload(true)}
                  >
                    <UploadIcon className="mr-2 size-4" />
                    Upload File
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            {SIDEBAR_LINKS.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={location.pathname === item.url}
                  asChild
                >
                  <Link to={item.url} className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <UploadFile open={openUpload} onOpenChange={setOpenUpload} />
      <NewFolder open={openCreateFolder} onOpenChange={setOpenCreateFolder} />
    </>
  );
};

export default AppSidebar;
