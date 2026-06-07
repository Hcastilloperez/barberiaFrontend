import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ModernFormField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  description,
  disabled,
  className = "space-y-2",
  children,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center gap-1">
            <FormLabel>{label}</FormLabel>
            {required && <span className="text-red-500">*</span>}
          </div>
          <FormControl>
            {children ? (
              children(field)
            ) : type === "select" ? (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>{children}</SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                disabled={disabled}
                className="h-11"
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ModernFormSection = ({ title, description, children }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

export const ModernForm = ({
  schema,
  defaultValues = {},
  onSubmit,
  children,
  submitLabel = "Guardar",
  cancelLabel = "Cancelar",
  onCancel,
  loading = false,
  className = "",
}) => {
  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  const handleSubmit = async (data) => {
    try {
      await onSubmit(data);
      toast.success("Guardado correctamente");
    } catch (error) {
      toast.error("Error al guardar");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        {children}
        <div className="flex items-center gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              {cancelLabel}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ModernForm;