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

const Barbero = (props) => {
  const { barberos, barbero, setBarbero } = props;
  console.log("barberos", barberos);

  return (
    <RadioGroup
      value={barbero}
      onValueChange={setBarbero}
      className="grid gap-4 md:grid-cols-2"
    >
      {barberos.map((b) => (
        <div key={b.id}>
          <RadioGroupItem
            value={b.id.toString()}
            id={`barbero-${b.id}`}
            className="peer sr-only"
          />
          <label
            htmlFor={`barbero-${b.id}`}
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <div className="mb-3 h-16 w-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
              {b.usuario.nombres?.charAt(0)}
            </div>
            <div className="text-center">
              <p className="font-medium">
                {b.usuario?.nombres + " " + b.usuario?.apellidos}
              </p>
              <p className="text-sm text-muted-foreground">{b.tipo}</p>
              <p className="text-sm text-muted-foreground">
                {b.usuario?.descripcion}
              </p>
            </div>
          </label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default Barbero;
