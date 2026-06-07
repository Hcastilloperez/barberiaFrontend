//import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function BarbersSection() {
  const barbers = [
    {
      name: "Carlos Rodríguez",
      role: "Maestro Barbero",
      image: "/placeholder.svg?height=400&width=400",
      description:
        "Especialista en cortes clásicos y modernos con más de 10 años de experiencia.",
      social: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
    },
    {
      name: "Miguel Ángel",
      role: "Barbero Estilista",
      image: "/placeholder.svg?height=400&width=400",
      description: "Experto en diseños personalizados y degradados perfectos.",
      social: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
    },
    {
      name: "Alejandro Torres",
      role: "Barbero Senior",
      image: "/placeholder.svg?height=400&width=400",
      description:
        "Especializado en barbas y tratamientos faciales para el hombre moderno.",
      social: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
    },
  ];

  return (
    <section id="barberos" className="py-16 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Nuestros Barberos
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl">
            Profesionales apasionados por su trabajo y comprometidos con la
            excelencia.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg">
              {/*  <div className="aspect-square relative">
                <Image
                  src={barber.image || "/placeholder.svg"}
                  alt={barber.name}
                  fill
                  className="object-cover"
                />
              </div> */}
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{barber.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {barber.role}
                </p>
                <p className="text-muted-foreground mb-4">
                  {barber.description}
                </p>
                <div className="flex gap-4">
                  <a
                    href={barber.social.instagram}
                    aria-label="Instagram"
                    className="text-muted-foreground hover:text-foreground">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={barber.social.facebook}
                    aria-label="Facebook"
                    className="text-muted-foreground hover:text-foreground">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={barber.social.twitter}
                    aria-label="Twitter"
                    className="text-muted-foreground hover:text-foreground">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
