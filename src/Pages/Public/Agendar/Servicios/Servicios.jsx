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

const servicios = [
  { id: 1, nombre: "Corte de cabello", duracion: 30, precio: 15 },
  { id: 2, nombre: "Afeitado de barba", duracion: 20, precio: 10 },
  { id: 3, nombre: "Corte y barba", duracion: 45, precio: 22 },
  { id: 4, nombre: "Corte premium", duracion: 45, precio: 25 },
  { id: 5, nombre: "Tratamiento capilar", duracion: 40, precio: 30 },
];

const Servicios = (props) => {
  const { servicios, servicio, setServicio } = props;

  return (
    <RadioGroup
      value={servicio}
      onValueChange={setServicio}
      className="grid gap-4"
    >
      {servicios.map((s) => (
        <div key={s.id} className="relative">
          <RadioGroupItem
            value={s.id.toString()}
            id={`servicio-${s.id}`}
            className="peer sr-only"
          />
          <label
            htmlFor={`servicio-${s.id}`}
            className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <div>
              <p className="font-medium">{s.nombre}</p>
              <p className="text-sm text-muted-foreground">
                Duración: {s.duracion} min
              </p>
            </div>
            <div className="font-medium">${s.valor}</div>
          </label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default Servicios;
