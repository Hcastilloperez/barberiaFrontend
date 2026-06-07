import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  Menu,
  Clock,
  LogOut,
  User,
  Star,
} from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";
import { ThemeToggle } from "@/components/Public/landing/theme-toggle";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SideMenu from "./SideMenu";

import { logOut } from "@/redux/slices/authSlice";

const LayoutBarbero = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [currentComponent, setCurrentComponent] = useState("");
  const { isAuth, userData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    const tenantSlug = localStorage.getItem("tenantSlug");
    dispatch(logOut());
    localStorage.removeItem("tenantSlug");
    if (tenantSlug) {
      navigate(`/login/${tenantSlug}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50/50 via-background to-background">
      {/* Sidebar for larger screens - styled for barbero */}
      <aside className="hidden w-64 border-r bg-gradient-to-b from-indigo-600 to-indigo-800 md:block shadow-xl">
        <SideMenu
          currentComponent={currentComponent}
          setCurrentComponent={setCurrentComponent}
          className={""}
        />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="relative flex h-16 items-center gap-4 border-b bg-card/80 backdrop-blur-sm px-4 lg:px-6 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-indigo-50 text-indigo-600">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-indigo-700">
              <SideMenu
                currentComponent={currentComponent}
                setCurrentComponent={setCurrentComponent}
                className={""}
              />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
              <LogoScissors className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-foreground font-bold text-xl tracking-tight">
                AREA BARBERO
              </span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative hover:bg-indigo-50">
              <Bell className="h-5 w-5 text-indigo-600" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="rounded-full bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 transition-colors">
                  {userData.name?.charAt(0) + userData.apellido?.charAt(0)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  <Link to="/perfil" className="flex w-full items-center gap-2">
                    <User className="h-4 w-4" />
                    Mi Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-muted cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10">
                  <Link onClick={handleLogout} className="flex w-full items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl rounded-xl border bg-card p-6 shadow-sm">
            <Outlet />
          </div>
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default LayoutBarbero;