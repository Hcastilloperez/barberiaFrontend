import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Scissors,
  BeakerIcon as Beard,
  SprayCanIcon as Spray,
  Coffee,
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Corte de Cabello",
      price: "$15",
      description: "Corte personalizado según tu estilo y preferencias.",
      icon: Scissors,
    },
    {
      title: "Arreglo de Barba",
      price: "$10",
      description: "Perfilado y tratamiento completo para tu barba.",
      icon: Beard,
    },
    {
      title: "Corte + Barba",
      price: "$22",
      description: "Combo completo para renovar tu imagen.",
      icon: Scissors,
    },
    {
      title: "Tratamiento Capilar",
      price: "$25",
      description: "Hidratación y nutrición para tu cabello.",
      icon: Spray,
    },
    {
      title: "Afeitado Clásico",
      price: "$18",
      description: "Afeitado tradicional con navaja y toalla caliente.",
      icon: Beard,
    },
    {
      title: "Experiencia Premium",
      price: "$35",
      description: "Corte, barba, masaje facial y bebida de cortesía.",
      icon: Coffee,
    },
  ];

  return (
    <section id="servicios" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl">
            Ofrecemos una amplia gama de servicios para satisfacer todas tus
            necesidades.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-primary text-primary-foreground p-2 rounded-md">
                  <service.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="font-bold text-lg">{service.price}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
