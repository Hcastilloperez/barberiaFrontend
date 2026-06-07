"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

// Definir el esquema de validación con Zod
const formSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" }),
  apellido: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
    .max(50, { message: "El apellido no puede exceder 50 caracteres" }),
  edad: z
    .string()
    .refine((val) => !isNaN(Number.parseInt(val)), {
      message: "La edad debe ser un número",
    })
    .refine(
      (val) => Number.parseInt(val) >= 18 && Number.parseInt(val) <= 100,
      {
        message: "La edad debe estar entre 18 y 100 años",
      }
    ),
  profesion: z.string({
    required_error: "Por favor seleccione una profesión",
  }),
  sexo: z.enum(["masculino", "femenino", "otro"], {
    required_error: "Por favor seleccione su sexo",
  }),
  estadoCivil: z.enum(["soltero", "casado", "divorciado", "viudo"], {
    required_error: "Por favor seleccione su estado civil",
  }),
});

export default function FormWithValidation() {
  const [showSummary, setShowSummary] = useState(false);
  const [formData, setFormData] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      edad: "",
      profesion: "",
      sexo: undefined,
      estadoCivil: undefined,
    },
  });

  function onSubmit(data) {
    console.log("Data", data);
    setFormData(data);

    setShowSummary(true);
  }

  function handleConfirm() {
    // Aquí iría la lógica para guardar en la base de datos
    alert(
      "Datos enviados correctamente. Listos para guardar en la base de datos."
    );
    // Resetear el formulario
    form.reset();
    setShowSummary(false);
  }

  function handleEdit() {
    setShowSummary(false);
  }

  const profesiones = [
    { value: "ingeniero", label: "Ingeniero" },
    { value: "medico", label: "Médico" },
    { value: "abogado", label: "Abogado" },
    { value: "profesor", label: "Profesor" },
    { value: "diseñador", label: "Diseñador" },
    { value: "programador", label: "Programador" },
    { value: "contador", label: "Contador" },
    { value: "otro", label: "Otro" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {!showSummary ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="edad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese su edad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profesion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profesión</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione su profesión" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {profesiones.map((profesion) => (
                        <SelectItem
                          key={profesion.value}
                          value={profesion.value}>
                          {profesion.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sexo"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="masculino" />
                        </FormControl>
                        <FormLabel className="font-normal">Masculino</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="femenino" />
                        </FormControl>
                        <FormLabel className="font-normal">Femenino</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="otro" />
                        </FormControl>
                        <FormLabel className="font-normal">Otro</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estadoCivil"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Estado Civil</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="soltero" />
                        </FormControl>
                        <FormLabel className="font-normal">Soltero/a</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="casado" />
                        </FormControl>
                        <FormLabel className="font-normal">Casado/a</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="divorciado" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Divorciado/a
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="viudo" />
                        </FormControl>
                        <FormLabel className="font-normal">Viudo/a</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Revisar Datos
            </Button>
          </form>
        </Form>
      ) : (
        <DataSummary
          data={formData}
          profesiones={profesiones}
          onConfirm={handleConfirm}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

function DataSummary({ data, profesiones, onConfirm, onEdit }) {
  // Función para obtener la etiqueta de la profesión
  const getProfesionLabel = (value) => {
    const profesion = profesiones.find((p) => p.value === value);
    return profesion ? profesion.label : value;
  };

  // Mapeo de valores para mostrar en español
  const sexoLabels = {
    masculino: "Masculino",
    femenino: "Femenino",
    otro: "Otro",
  };

  const estadoCivilLabels = {
    soltero: "Soltero/a",
    casado: "Casado/a",
    divorciado: "Divorciado/a",
    viudo: "Viudo/a",
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-800">Revisión de datos</AlertTitle>
        <AlertDescription className="text-green-700">
          Por favor revise sus datos antes de confirmar el envío.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Nombre</Label>
                <p className="font-medium">{data.nombre}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Apellido
                </Label>
                <p className="font-medium">{data.apellido}</p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Edad</Label>
              <p className="font-medium">{data.edad} años</p>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Profesión</Label>
              <p className="font-medium">{getProfesionLabel(data.profesion)}</p>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Sexo</Label>
              <p className="font-medium">{sexoLabels[data.sexo]}</p>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">
                Estado Civil
              </Label>
              <p className="font-medium">
                {estadoCivilLabels[data.estadoCivil]}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onEdit} className="flex-1">
          Editar
        </Button>
        <Button onClick={onConfirm} className="flex-1">
          Confirmar y Guardar
        </Button>
      </div>
    </div>
  );
}
