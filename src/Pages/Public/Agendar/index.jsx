import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { toast } from "sonner";

import { GetPuestosbyEstado } from "@/Hooks/usePuesto";
import { GetServiciosEstado } from "@/Hooks/useServicio";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Navbar from "./NavBar/Navbar";
import BarberoAgendaPage from "./Barberro/Barbero";
import CitasAgendaPage from "./Citas/citas";
import ServiciosAgendaPage from "./Servicios/Servicios";
import HorarioAgendaPage from "./Horario/Horario";

// Datos de ejemplo
const barberos = [
  { id: 1, nombre: "Carlos Rodríguez", especialidad: "Cortes clásicos" },
  { id: 2, nombre: "Miguel Ángel", especialidad: "Barba y afeitado" },
  { id: 3, nombre: "Juan Pérez", especialidad: "Cortes modernos" },
  { id: 4, nombre: "Roberto Sánchez", especialidad: "Degradados" },
];

const servicios = [
  { id: 1, nombre: "Corte de cabello", duracion: 30, precio: 15 },
  { id: 2, nombre: "Afeitado de barba", duracion: 20, precio: 10 },
  { id: 3, nombre: "Corte y barba", duracion: 45, precio: 22 },
  { id: 4, nombre: "Corte premium", duracion: 45, precio: 25 },
  { id: 5, nombre: "Tratamiento capilar", duracion: 40, precio: 30 },
];

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

const Index = () => {
  const [fecha, setFecha] = useState("");
  const [barbero, setBarbero] = useState("");
  const [servicio, setServicio] = useState("");
  const [horario, setHorario] = useState("");
  const [paso, setPaso] = useState(1);

  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [refetch, setRefetch] = useState(false);
  const onRefetch = () => setRefetch((prev) => !prev);

  /***********************************
   *
   *
   * CARGO DE BARBEROS DESDE LA API
   * CARGO DE SERVICIOS DESDE LA API
   *
   *
   */
  useEffect(() => {
    getInitialData();
  }, [refetch]);

  const getInitialData = async () => {
    try {
      const barber = await GetPuestosbyEstado("Activa");
      setBarberos(barber);

      const serv = await GetServiciosEstado();
      setServicios(serv);

      console.log("Barberos:");
    } catch (error) {
      console.log(error);
    }
  };

  const avanzarPaso = () => {
    if (paso < 4) {
      setPaso(paso + 1);
    }
  };

  const retrocederPaso = () => {
    if (paso > 1) {
      setPaso(paso - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Cita agendada correctamente");
    setPaso(4);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background text-foreground">
        {/* <div className="container max-w-4xl py-10"> */}
        <h1 className="text-3xl font-bold mb-8">Agendar una cita</h1>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paso >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              1
            </div>
            <div
              className={`h-1 w-12 ${paso >= 2 ? "bg-primary" : "bg-muted"}`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paso >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              2
            </div>
            <div
              className={`h-1 w-12 ${paso >= 3 ? "bg-primary" : "bg-muted"}`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paso >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              3
            </div>
            <div
              className={`h-1 w-12 ${paso >= 4 ? "bg-primary" : "bg-muted"}`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paso >= 4 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              4
            </div>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {paso === 1 && "Selecciona un barbero"}
              {paso === 2 && "Elige un servicio"}
              {paso === 3 && "Selecciona fecha y hora"}
              {paso === 4 && "Confirmación de cita"}
            </CardTitle>
            <CardDescription>
              {paso === 1 &&
                "Elige el profesional que prefieras para tu servicio"}
              {paso === 2 && "Selecciona el tipo de servicio que deseas"}
              {paso === 3 && "Elige el día y la hora que mejor te convenga"}
              {paso === 4 && "Tu cita ha sido agendada correctamente"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {paso === 1 && (
                <BarberoAgendaPage
                  barberos={barberos}
                  barbero={barbero}
                  setBarbero={setBarbero}
                />
              )}

              {paso === 2 && (
                <ServiciosAgendaPage
                  servicios={servicios}
                  servicio={servicio}
                  setServicio={setServicio}
                />
              )}

              {paso === 3 && (
                <HorarioAgendaPage
                  fecha={fecha}
                  setFecha={setFecha}
                  horario={horario}
                  setHorario={setHorario}
                />
              )}

              {paso === 4 && (
                <CitasAgendaPage
                  barbero={barbero}
                  servicio={servicio}
                  fecha={fecha}
                  horario={horario}
                  barberos={barberos}
                  servicios={servicios}
                />
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {paso > 1 && paso < 4 && (
              <Button variant="outline" onClick={retrocederPaso}>
                Anterior
              </Button>
            )}
            {paso === 1 && (
              <Button variant="outline" asChild>
                <a href="/">Cancelar</a>
              </Button>
            )}
            {paso < 3 && (
              <Button
                onClick={avanzarPaso}
                disabled={(paso === 1 && !barbero) || (paso === 2 && !servicio)}
              >
                Siguiente
              </Button>
            )}
            {paso === 3 && (
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!fecha || !horario}
              >
                Confirmar Cita
              </Button>
            )}
            {paso === 4 && (
              <Button asChild>
                <Link href="/AgendarCita">Agendar Otra Cita</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Index;
