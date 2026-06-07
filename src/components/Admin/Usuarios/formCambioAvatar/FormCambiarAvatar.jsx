import { useEffect, useState } from "react";
import { dir } from "@/Config/Axios";
import { toast } from "sonner";
import { Upload, ImageIcon, Loader2 } from "lucide-react";

import { subirFoto, UpdateUsuarios } from "@/Hooks/useUsuarios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FormCambiarAvatar = ({ usuario, onRefetch }) => {
  const [fotoBack, setFoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    getRutaFoto();
  }, [usuario]);

  const getRutaFoto = async () => {
    try {
      if (usuario?.foto) {
        const fotoUrl = dir + "usuarios/usuarios/subir/subirImagen/bajarimagen/" + usuario.foto;
        setFoto(fotoUrl);
        setPreviewUrl(fotoUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fileInput = e.target.foto;
    if (!fileInput.files?.length) {
      toast.error("Seleccione una imagen");
      return;
    }

    setLoading(true);
    try {
      const formDataImagen = new FormData();
      formDataImagen.append("foto", fileInput.files[0]);

      await subirFoto(usuario.id, formDataImagen);

      const formDataUsuario = {
        foto: fileInput.files[0].name,
      };
      await UpdateUsuarios(usuario.id, formDataUsuario);

      toast.success("Imagen actualizada correctamente");
      onRefetch?.();
    } catch (error) {
      console.log(error);
      toast.error("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
          <ImageIcon className="h-5 w-5 text-yellow-500" />
          Cambiar Avatar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden border-4 border-white shadow-lg">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={usuario?.nombres}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <Upload className="h-3 w-3" />
              Seleccionar Imagen
            </label>
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer border rounded-lg p-2"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Actualizar Imagen
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCambiarAvatar;