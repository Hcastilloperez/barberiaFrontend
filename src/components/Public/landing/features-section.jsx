import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Bell, 
  Smartphone, 
  CreditCard,
  Scissors,
  Clock
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Gestión de Citas",
      description: "Agenda, modifica y controla todas las citas desde un solo lugar. Tus clientes pueden reservar online 24/7.",
    },
    {
      icon: Users,
      title: "Control de Empleados",
      description: "Gestiona horarios, comisiones y rendimiento de tu equipo de forma sencilla y transparente.",
    },
    {
      icon: BarChart3,
      title: "Reportes y Estadísticas",
      description: "Visualiza en tiempo real los ingresos, servicios más populares y el desempeño de tu barbería.",
    },
    {
      icon: Bell,
      title: "Notificaciones Automáticas",
      description: "Envía recordatorios automáticos a tus clientes por SMS y WhatsApp para reducir ausencias.",
    },
    {
      icon: Smartphone,
      title: "App Móvil",
      description: "Administra tu barbería desde cualquier lugar con nuestra aplicación móvil intuitiva.",
    },
    {
      icon: CreditCard,
      title: "Pagos Integrados",
      description: "Acepta pagos con tarjeta, transferencias y efectivo. Conciliación automática de ingresos.",
    },
    {
      icon: Scissors,
      title: "Catálogo de Servicios",
      description: "Crea y gestiona tu menú de servicios con precios, duración y descripción detallada.",
    },
    {
      icon: Clock,
      title: "Puntos de Venta (POS)",
      description: "Vende productos, gestiona tu inventario y controla el acceso de barberos a la caja.",
    },
  ];

  return (
    <section id="caracteristicas" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Todo lo que necesitas en una sola plataforma
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Herramientas completas diseñadas específicamente para barberías modernas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-none shadow-md hover:shadow-lg transition-all hover:border-yellow-200"
            >
              <CardHeader className="pb-3">
                <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg w-fit mb-3">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}