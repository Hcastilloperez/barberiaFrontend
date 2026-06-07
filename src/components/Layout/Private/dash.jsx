import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Scissors,
  Calendar,
  Users,
  Package,
  BarChart,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Plus,
  Clock,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const dash = () => {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Bienvenido de nuevo, Juan</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Hoy
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Hoy</DropdownMenuItem>
              <DropdownMenuItem>Esta semana</DropdownMenuItem>
              <DropdownMenuItem>Este mes</DropdownMenuItem>
              <DropdownMenuItem>Este año</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva cita
          </Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Citas hoy</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">+2.5% respecto a ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes nuevos
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500">
              +12% respecto a la semana pasada
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ingresos hoy</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$580</div>
            <p className="text-xs text-gray-500">+8% respecto a ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tiempo promedio
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 min</div>
            <p className="text-xs text-gray-500">
              -5% respecto a la semana pasada
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Tabs Section */}
      <div className="mt-6">
        <Tabs defaultValue="appointments">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="appointments">Citas</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Citas de hoy</CardTitle>
                <CardDescription>
                  Tienes 12 citas programadas para hoy
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {/* Appointment 1 */}
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Avatar"
                      />
                      <AvatarFallback>RM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Roberto Méndez</p>
                        <Badge>10:00 AM</Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Corte de cabello + Barba
                      </p>
                    </div>
                  </div>

                  {/* Appointment 2 */}
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Avatar"
                      />
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Alejandro López</p>
                        <Badge>11:30 AM</Badge>
                      </div>
                      <p className="text-xs text-gray-500">Corte de cabello</p>
                    </div>
                  </div>

                  {/* Appointment 3 */}
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Avatar"
                      />
                      <AvatarFallback>MG</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Miguel García</p>
                        <Badge>1:00 PM</Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Corte de cabello + Color
                      </p>
                    </div>
                  </div>

                  {/* Appointment 4 */}
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Avatar"
                      />
                      <AvatarFallback>JR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Javier Rodríguez</p>
                        <Badge>2:30 PM</Badge>
                      </div>
                      <p className="text-xs text-gray-500">Barba</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">
                  Ver todas las citas
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Clientes recientes</CardTitle>
                <CardDescription>
                  Has atendido a 28 clientes este mes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {/* Client 1 */}
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Avatar"
                      />
                      <AvatarFallback>RM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Roberto Méndez</p>
                      <p className="text-xs text-gray-500">8 visitas</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver perfil
                    </Button>
                  </div>

                  {/* Client 2 */}
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Avatar"
                      />
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Alejandro López</p>
                      <p className="text-xs text-gray-500">12 visitas</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver perfil
                    </Button>
                  </div>

                  {/* Client 3 */}
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Avatar"
                      />
                      <AvatarFallback>MG</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Miguel García</p>
                      <p className="text-xs text-gray-500">5 visitas</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver perfil
                    </Button>
                  </div>

                  {/* Client 4 */}
                  <div className="flex items-center gap-4 p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Avatar"
                      />
                      <AvatarFallback>JR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Javier Rodríguez</p>
                      <p className="text-xs text-gray-500">3 visitas</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver perfil
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">
                  Ver todos los clientes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Servicios populares</CardTitle>
                <CardDescription>
                  Servicios más solicitados este mes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Corte de cabello</p>
                      <span className="text-sm text-gray-500">65%</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Barba</p>
                      <span className="text-sm text-gray-500">40%</span>
                    </div>
                    <Progress value={40} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Corte + Barba</p>
                      <span className="text-sm text-gray-500">30%</span>
                    </div>
                    <Progress value={30} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Color</p>
                      <span className="text-sm text-gray-500">15%</span>
                    </div>
                    <Progress value={15} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">
                  Administrar servicios
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Recent Activity */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
            <CardDescription>
              Últimas acciones realizadas en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="flex items-center gap-4 p-4">
                <div className="rounded-full bg-blue-100 p-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Nueva cita agendada</p>
                  <p className="text-xs text-gray-500">
                    Roberto Méndez - 10:00 AM
                  </p>
                </div>
                <p className="text-xs text-gray-500">Hace 5 min</p>
              </div>
              <div className="flex items-center gap-4 p-4">
                <div className="rounded-full bg-green-100 p-2">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    Nuevo cliente registrado
                  </p>
                  <p className="text-xs text-gray-500">Carlos Vega</p>
                </div>
                <p className="text-xs text-gray-500">Hace 1 hora</p>
              </div>
              <div className="flex items-center gap-4 p-4">
                <div className="rounded-full bg-purple-100 p-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Pago recibido</p>
                  <p className="text-xs text-gray-500">Miguel García - $45</p>
                </div>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
              <div className="flex items-center gap-4 p-4">
                <div className="rounded-full bg-yellow-100 p-2">
                  <Package className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    Producto agregado al inventario
                  </p>
                  <p className="text-xs text-gray-500">
                    Gel para cabello - 12 unidades
                  </p>
                </div>
                <p className="text-xs text-gray-500">Hace 3 horas</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="outline" className="w-full">
              Ver toda la actividad
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default dash;
