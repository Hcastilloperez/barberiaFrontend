import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";
import { ThemeToggle } from "@/components/Public/landing/theme-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <LogoScissors className="h-8 w-8" />
          <span className="text-yellow-600 font-bold text-2xl tracking-tight">
            BarberControl
          </span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <a
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Pagina principal
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="default">
            <Link to={"/login"}> Iniciar Sesión</Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-4">
            <Link
              to="/login"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar Sesion
            </Link>
            <Link
              to="/"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Pagina Principal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
