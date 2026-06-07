"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/Public/landing/theme-toggle";

const LogoIcon = () => (
  <svg
    viewBox="0 0 48 48"
    className="h-10 w-10 shrink-0"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="22" fill="#FEF3C7" stroke="#CA8A04" strokeWidth="2.5" />
    <path
      d="M16 14V26C16 30.4183 19.5817 34 24 34C28.4183 34 32 30.4183 32 26V14"
      stroke="#57534E"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M12 14L16 14"
      stroke="#57534E"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M32 14L36 14"
      stroke="#57534E"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M16 26C16 26 18 28 24 28C30 28 32 26 32 26"
      stroke="#EAB308"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M16 34L16 40C16 41.1046 16.8954 42 18 42H30C31.1046 42 32 41.1046 32 40V34"
      stroke="#57534E"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line x1="20" y1="42" x2="20" y2="44" stroke="#57534E" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="42" x2="28" y2="44" stroke="#57534E" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M18 14V12C18 10.8954 18.8954 10 20 10H28C29.1046 10 30 10.8954 30 12V14"
      stroke="#A8A29E"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "caracteristicas", label: "Características" },
  { id: "precios", label: "Precios" },
  { id: "testimonios", label: "Testimonios" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-yellow-200/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <LogoIcon />
            <div className="flex items-baseline gap-0">
              <span className="text-yellow-600 font-bold text-xl tracking-tight">
                Barber
              </span>
              <span className="text-stone-800 font-bold text-xl tracking-tight">
                Control
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  activeSection === item.id
                    ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30"
                    : "text-muted-foreground hover:text-yellow-600 hover:bg-yellow-50/50 dark:hover:bg-yellow-950/20"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white shadow-lg shadow-yellow-500/25 font-medium"
            >
              <Link to="/AgendarCita">Prueba Gratis</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-lg">
          <div className="container px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all rounded-lg ${
                  activeSection === item.id
                    ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30"
                    : "text-muted-foreground hover:text-yellow-600 hover:bg-yellow-50/50 dark:hover:bg-yellow-950/20"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t space-y-2">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-muted-foreground">Tema</span>
                <ThemeToggle />
              </div>
              <Button
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white"
                asChild
              >
                <Link to="/AgendarCita">Prueba Gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}