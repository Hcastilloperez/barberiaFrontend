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

const horariosDisponibles = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

const Horario = (props) => {
  const { fecha, setFecha, horario, setHorario } = props;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Fecha
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fecha ? (
                format(fecha, "PPP", { locale: es })
              ) : (
                <span>Selecciona una fecha</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={fecha}
              onSelect={setFecha}
              initialFocus
              disabled={(date) =>
                date < new Date() || date > addDays(new Date(), 30)
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Horario
        </label>

        <Select value={horario} onValueChange={setHorario}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un horario" />
          </SelectTrigger>
          <SelectContent>
            {horariosDisponibles.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Horario;
