import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Roberto Sánchez",
      role: "Dueño de Barbería Royal Cut",
      location: "Ciudad de México",
      rating: 5,
      comment:
        "Desde que implementamos BarberControl, nuestras citas aumentaron un 40%. Los clientes adoran poder reservar online. El sistema es intuitivo y mi equipo lo adoptó sin problemas.",
    },
    {
      name: "Carlos Mendoza",
      role: "Barbero en Estilo Latino",
      location: "Guadalajara",
      rating: 5,
      comment:
        "La aplicación móvil me permite ver mi agenda desde cualquier lugar. Ya no tengo que llamar a la barbería para saber mis horarios. Me cambió la vida laboral.",
    },
    {
      name: "Miguel Torres",
      role: "Propietario de 3 barberías",
      location: "Monterrey",
      rating: 5,
      comment:
        "Con el plan empresarial puedo gestionar las 3 sucursales desde un solo panel. Los reportes me ayudan a tomar mejores decisiones. El soporte es excelente.",
    },
  ];

  return (
    <section id="testimonios" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Más de 500 barberías ya confían en BarberControl para gestionar su negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg relative">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-yellow-200 absolute top-4 right-4" />
                <div className="flex mb-3">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                </div>
                <p className="text-muted-foreground mb-6 relative z-10">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 h-12 w-12 rounded-full flex items-center justify-center">
                    <span className="text-yellow-800 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center mt-12 gap-4">
          <div className="flex items-center gap-8 text-muted-foreground">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">500+</p>
              <p className="text-sm">Barberías</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">50K+</p>
              <p className="text-sm">Citas mensuales</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">98%</p>
              <p className="text-sm">Satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}