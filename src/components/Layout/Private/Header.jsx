import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/slices/authSlice";
import {
  Calendar,
  Users,
  Package,
  BarChart,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Plus,
  Clock,
  DollarSign,
} from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <nav className="grid gap-2 p-4">
            <div className="flex items-center gap-2 pb-4 pt-2">
              <LogoScissors className="h-6 w-6" />
              <span className="text-xl font-bold">BarberPro</span>
              <Button variant="ghost" size="icon" className="ml-auto">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900"
            >
              <BarChart className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Calendar className="h-5 w-5" />
              Citas
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Users className="h-5 w-5" />
              Clientes
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Package className="h-5 w-5" />
              Inventario
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Settings className="h-5 w-5" />
              Configuración
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <LogoScissors className="h-6 w-6" />
        <span className="text-xl font-bold">BarberPro</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="Avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
<DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-600">
                Cerrar sesión
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
