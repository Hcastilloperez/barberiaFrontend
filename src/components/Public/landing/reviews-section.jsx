import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
//import Image from "next/image";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Roberto García",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      comment:
        "Excelente servicio, el mejor corte que he tenido en años. El ambiente es muy agradable y profesional.",
      date: "Hace 2 semanas",
    },
    {
      name: "Juan Martínez",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      comment:
        "Me encantó el servicio de barba, muy detallado y con productos de primera calidad. Volveré pronto.",
      date: "Hace 1 mes",
    },
    {
      name: "Diego Hernández",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      comment:
        "Gran experiencia, barberos muy profesionales y atentos. El lugar tiene un ambiente muy moderno.",
      date: "Hace 3 semanas",
    },
  ];

  return (
    <section id="reseñas" className="py-16 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl">
            La satisfacción de nuestros clientes es nuestra mejor carta de
            presentación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {/*  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div> */}

                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
