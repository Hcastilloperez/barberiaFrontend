import React from "react";
import { MoreVertical, Edit, Trash2, Play, Pause, User, Phone, Mail, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const InfoItem = ({ icon: Icon, label, value, className = "" }) => {
  if (!value) return null;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon className="h-4 w-4 text-gray-400" />
      <span className="text-sm text-gray-500">{label}:</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
};

export const StatusBadge = ({ status }) => {
  const isActive = status === "Activa" || status === "Activo";
  return (
    <Badge variant={isActive ? "success" : "secondary"}>
      {isActive ? "Activo" : "Inactivo"}
    </Badge>
  );
};

export const ModernCard = ({
  title,
  description,
  items = [],
  status,
  footer,
  onEdit,
  onDelete,
  onToggle,
  avatar,
  avatarFallback,
  className = "",
}) => {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {avatar && (
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src={avatar} alt="" className="h-full w-full object-cover" />
              </div>
            )}
            {avatarFallback && !avatar && (
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 font-semibold text-lg">
                  {avatarFallback}
                </span>
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && (
                <CardDescription>{description}</CardDescription>
              )}
            </div>
          </div>
          {status && <StatusBadge status={status} />}
        </div>
      </CardHeader>
      {items.length > 0 && (
        <CardContent className="pb-2">
          <div className="space-y-2">
            {items.map((item, index) => (
              <InfoItem
                key={index}
                icon={item.icon || User}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </CardContent>
      )}
      {(onEdit || onDelete || onToggle || footer) && (
        <CardFooter className="pt-2 justify-between">
          {footer}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit()}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
              )}
              {onToggle && (
                <DropdownMenuItem onClick={() => onToggle()}>
                  {status === "Activa" || status === "Activo" ? (
                    <>
                      <Pause className="mr-2 h-4 w-4 text-yellow-600" />
                      Desactivar
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4 text-green-600" />
                      Activar
                    </>
                  )}
                </DropdownMenuItem>
              )}
              {onDelete && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete()}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      )}
    </Card>
  );
};

export const ModernCardGrid = ({
  data = [],
  renderCard,
  columns = 3,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4 ${className}`}>
      {data.map((item, index) => renderCard(item, index))}
    </div>
  );
};

export default {
  ModernCard,
  ModernCardGrid,
  InfoItem,
  StatusBadge,
};