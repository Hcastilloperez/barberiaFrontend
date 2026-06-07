import { Link } from "react-router-dom";
import LogoScissors from "@/components/common/LogoScissors";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LogoScissors className="h-8 w-8" />
              <span className="text-xl font-bold">BarberControl</span>
            </div>
            <p className="text-gray-400">
              El sistema de gestión todo-en-uno para barberías modernas. 
              Controla citas, empleados e inventario desde cualquier lugar.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Producto</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Integraciones
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Prensa
                </a>
              </li>
            </ul>
          </div>

          <div id="contacto">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                <span className="text-gray-400">Av. Insurgentes Sur 1234, CDMX</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                <a href="tel:+521234567890" className="text-gray-400 hover:text-white transition-colors">
                  +52 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400 shrink-0" />
                <a href="mailto:hola@barbercontrol.com" className="text-gray-400 hover:text-white transition-colors">
                  hola@barbercontrol.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BarberControl. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos de servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
              <Link to="/super-login" className="text-gray-500 hover:text-gray-300 transition-colors text-xs">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}