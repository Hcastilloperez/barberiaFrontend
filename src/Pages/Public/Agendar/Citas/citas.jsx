import { useState } from "react";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const citas = (props) => {
  const { barbero, servicio, fecha, horario, barberos, servicios } = props;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-4">Detalles de tu cita</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Barbero:</span>
            <span className="font-medium">
              {barbero
                ? barberos.find((b) => b.id.toString() === barbero)?.usuario
                    .nombres +
                  " " +
                  barberos.find((b) => b.id.toString() === barbero)?.usuario
                    .apellidos
                : "No seleccionado"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Servicio:</span>
            <span className="font-medium">
              {servicio
                ? servicios.find((s) => s.id.toString() === servicio)?.nombre
                : "No seleccionado"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fecha:</span>
            <span className="font-medium">
              {fecha ? format(fecha, "PPP", { locale: es }) : "No seleccionada"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hora:</span>
            <span className="font-medium">{horario || "No seleccionada"}</span>
          </div>
          <div className="flex justify-between pt-2 border-t mt-2">
            <span className="font-medium">Precio total:</span>
            <span className="font-bold">
              $
              {servicio
                ? servicios.find((s) => s.id.toString() === servicio)?.valor
                : 0}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-green-50 p-4 text-green-800">
        <p className="text-center">¡Tu cita ha sido agendada con éxito!</p>
      </div>
    </div>
  );
};

export default citas;
