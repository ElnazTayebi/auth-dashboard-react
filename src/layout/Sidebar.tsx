import { Sidebar as ShadcnSidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "#/components/ui/sidebar";
import FormButton from "#/components/widgets/FormButton";
import { Link } from "@tanstack/react-router";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";

type SidebarProps = {
  handleLogout: () => void;
};

const menuItems = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Users", to: "/users", icon: Users, search: { page: 1 } },
  { title: "Posts", to: "/posts", icon: FileText },
  { title: "Settings", to: "/settings", icon: Settings },
];

const Sidebar = ({ handleLogout }: SidebarProps) => {
    const { setOpenMobile } = useSidebar();
  return (
    <ShadcnSidebar collapsible="icon"
    className="border-r border-gray-800 bg-gray-900 text-white"
    >
        <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
          <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center font-bold text-sm text-white">
            A
          </div>
        </div>
        </SidebarHeader>
        <SidebarContent className="p-2 bg-gray-900">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                  >
                    <Link
                      to={item.to}
                      search={item.search}
                     
                      onClick={() => setOpenMobile(false)}
                      className="[&.active]:bg-blue-600 [&.active]:text-white [&.active]:font-semibold flex items-center gap-3 w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    <SidebarFooter className="p-2 border-t border-gray-800 bg-gray-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sign Out">
              <FormButton
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-red-400 bg-red-900/10 hover:bg-red-600 hover:text-white transition-all gap-3"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Sign Out
                </span>
              </FormButton>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};
export default Sidebar;
