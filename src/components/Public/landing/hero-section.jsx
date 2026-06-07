import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-950/20 dark:to-background py-20 md:py-32">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-600"></span>
              </span>
              Nuevo: Sistema de gestión completo para barberías
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Controla tu barbería desde{" "}
              <span className="text-yellow-600">cualquier lugar</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Gestiona citas, empleados, inventario y clientes en una sola plataforma. 
              Diseñado para barberías que quieren crecer sin complicaciones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white" asChild>
                <Link to="/AgendarCita">
                  Comenzar gratis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Ver demo</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>14 días gratis</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>Cancela cuando quieras</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-muted-foreground">BarberControl Dashboard</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                      <span className="text-yellow-800 font-bold">CR</span>
                    </div>
                    <div>
                      <p className="font-medium">Carlos Rodríguez</p>
                      <p className="text-sm text-muted-foreground">Corte + Barba</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">Confirmado</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-blue-800 font-bold">JM</span>
                    </div>
                    <div>
                      <p className="font-medium">Juan Martínez</p>
                      <p className="text-sm text-muted-foreground">Corte clásico</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">Pendiente</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-800 font-bold">MH</span>
                    </div>
                    <div>
                      <p className="font-medium">Miguel Hernández</p>
                      <p className="text-sm text-muted-foreground">Arreglo de barba</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">Completado</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">+127%</p>
                  <p className="text-sm text-muted-foreground">Citas online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}