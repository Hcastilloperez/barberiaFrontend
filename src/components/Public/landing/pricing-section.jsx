import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingSection() {
  const plans = [
    {
      name: "Básico",
      price: "$29",
      period: "/mes",
      description: "Ideal para barberías que están iniciando",
      features: [
        "Hasta 2 empleados",
        "50 citas al mes",
        "Gestión de citas básica",
        "1 usuario administrador",
        "Reportes simples",
        "Soporte por email",
      ],
      popular: false,
    },
    {
      name: "Profesional",
      price: "$59",
      period: "/mes",
      description: "Para barberías en crecimiento",
      features: [
        "Hasta 8 empleados",
        "Citas ilimitadas",
        "Gestión de inventario",
        "3 usuarios administradores",
        "Reportes avanzados",
        "Notificaciones SMS/WhatsApp",
        "Punto de venta (POS)",
        "App móvil incluida",
      ],
      popular: true,
    },
    {
      name: "Empresarial",
      price: "$129",
      period: "/mes",
      description: "Para cadenas y franchises",
      features: [
        "Empleados ilimitados",
        "Citas ilimitadas",
        "Multi-sucursal",
        "Usuarios ilimitados",
        "API personalizada",
        "Integraciones premium",
        "Gestor de cuenta dedicado",
        "SLA garantizado",
        "Capacitación incluido",
      ],
      popular: false,
    },
  ];

  return (
    <section id="precios" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Planes transparentes, sin sorpresas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Elige el plan que mejor se adapte a tu barbería. Sin contratos a largo plazo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 ${
                plan.popular 
                  ? "border-yellow-500 shadow-xl scale-105" 
                  : "border-transparent shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Más popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-yellow-600 hover:bg-yellow-700 text-white" 
                      : ""
                  }`} 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to="/AgendarCita">Comenzar ahora</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          ¿Necesitas un plan personalizado? <a href="#contacto" className="text-yellow-600 hover:underline">Contáctanos</a> para una cotización específica.
        </p>
      </div>
    </section>
  );
}