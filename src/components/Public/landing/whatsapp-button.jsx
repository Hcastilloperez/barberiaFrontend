"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "521234567890";
const DEFAULT_MESSAGE = encodeURIComponent("Hola, me interesa conocer más sobre BarberControl para mi barbería.");

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={openWhatsApp}
        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        ¿Necesitas ayuda? Chatea con nosotros
      </div>
    </div>
  );
}