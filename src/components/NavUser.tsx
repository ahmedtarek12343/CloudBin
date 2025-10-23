import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { LogoutButton } from "./LogoutButton";

import { ChevronsUpDownIcon, LogIn, LogOutIcon } from "lucide-react";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { Button } from "./ui/button";
import { Link } from "react-router";

export const NavUser = () => {
  const { isMobile, state } = useSidebar();
  const { data, isError, isLoading } = useGetCurrentUser();

  const user = data?.user;
  const currentSession = data?.currentSession;

  if (isError)
    return (
      <Button asChild>
        <Link to="/auth/login">
          {state === "collapsed" ? <LogIn /> : "Login to continue"}
        </Link>
      </Button>
    );
  if (isLoading)
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[140px]" />
        </div>
      </div>
    );
  if (!user || !currentSession) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg bg-muted grid place-items-center">
                <AvatarFallback className="rounded-lg">
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1 5 text-left text-sm">
                <Avatar className="size-8 rounded-lg bg-muted grid place-items-center">
                  <AvatarFallback className="rounded-lg">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon className="mr-2 size-4" />
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
