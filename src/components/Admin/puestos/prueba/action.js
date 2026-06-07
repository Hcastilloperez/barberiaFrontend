"use server";

import { z } from "zod";

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string(),

  apellido: z.string(),

  edad: z.coerce
    .number()
    .int()
    .min(18, { message: "Debe ser mayor de 18 años" })
    .max(120, { message: "Edad inválida" }),
  profesion: z.string({ required_error: "Seleccione una profesión" }),
  sexo: z.enum(["masculino", "femenino", "otro"], {
    required_error: "Seleccione su sexo",
  }),
  estadoCivil: z.enum(["soltero", "casado", "divorciado", "viudo"], {
    required_error: "Seleccione su estado civil",
  }),
});

export async function enviarFormulario(prevState, formData) {
  // Validar los datos del formulario
  const validatedFields = formSchema.safeParse({});

  // Si hay errores de validación, retornar los errores
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Hay errores en el formulario. Por favor, revise los campos.",
    };
  }

  // Aquí podrías guardar los datos en una base de datos
  // Por ahora, solo simulamos un retraso para mostrar el estado de carga
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Retornar éxito
  return {
    success: true,
    data: validatedFields.data,
  };
}
