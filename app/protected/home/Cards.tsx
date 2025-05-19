"use client";
import { IoMdClose } from "react-icons/io";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddDeviceSchema } from "@/validations/AddDeviceSchema";
import { getCurrentSession, insertDevice, removeDevice } from "../../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import PowerChartComponent from "@/components/PowerChartComponent";

type Inputs = {
  deviceId: string;
  deviceName: string;
  deviceLocation: string;
};

export type Device = {
  id: string;
  title: string;
  content?: React.ReactNode;
  chartData: {
    device_id: number;
    month: string;
    total_power: number;
  }[];
  deviceLocation: string;
  isForm?: boolean; // Nueva propiedad para identificar cards de formularios
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-lime-400 rounded p-2 text-lime-400">
        <p className="font-semibold">{label}</p>
        <p>
          Consumo: <span className="font-bold">{payload[0].value} kWh</span>
        </p>
      </div>
    );
  }
  return null;
};

const CardGrid = ({ initialCards }: { initialCards: Device[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Device[]>(initialCards);
  const [showForm, setShowForm] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(AddDeviceSchema),
    defaultValues: {
      deviceName: "",
      deviceId: "",
      deviceLocation: "",
    },
  });

  const handleDeleteDevice = async (deviceId: string) => {
    const { status, user } = await getCurrentSession();
    if (!status || !user) {
      toast.error("No estás autenticado.");
      return;
    }
    const userId = user?.id;

    if (!deviceId) {
      toast.error("ID de dispositivo no válido.");
      return;
    }

    const { status: deleteStatus } = await removeDevice(deviceId, userId);
    if (deleteStatus) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== deviceId));
      toast.success("Dispositivo eliminado correctamente.");
    } else {
      toast.error("Error al eliminar el dispositivo.");
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);

    // Verificar primero si el usuario está autenticado
    const { status, user } = await getCurrentSession();

    if (!status || !user) {
      toast.error("No estás autenticado. Por favor inicia sesión.");
      setIsLoading(false);
      return;
    }

    // Crear el objeto newCard fuera para que esté disponible en el scope externo
    const newCard = {
      id: data.deviceId,
      title: data.deviceName,
      chartData: [], // <-- inicializa vacío o con datos reales si los tienes

      deviceLocation: data.deviceLocation,
    };

    // Usar toast.promise para manejar la operación asíncrona
    await toast.promise(
      // Primera parte: La promesa a ejecutar
      insertDevice(data, user),

      // Segunda parte: Los mensajes para diferentes estados
      {
        loading: "Agregando dispositivo...",
        success: (result) => {
          // Este callback se ejecuta cuando la promesa se resuelve exitosamente
          if (result.status) {
            // Actualizar la UI solo en caso de éxito
            setCards([...cards, newCard]);
            setShowForm(false);
            form.reset();
            return `Dispositivo "${data.deviceName}" agregado correctamente`;
          } else {
            // Si el resultado tiene status false, rechazamos la promesa para ir al catch
            throw new Error("Error al agregar dispositivo");
          }
        },
        error: (err) => {
          // Este callback se ejecuta cuando la promesa es rechazada
          console.error("Error al agregar dispositivo:", err);
          return `Error al agregar dispositivo: ${err.message || "Intente nuevamente"}`;
        },
      }
    );

    // Siempre desactivamos el loading al finalizar
    setIsLoading(false);
  });

  const addNewCard = () => {
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Mis Dispositivos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cards existentes */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-black shadow-md rounded-lg p-4 border border-lime-200"
          >
            <div className="flex flex-row justify-between">
              <h3 className="font-semibold text-lg mb-2 text-lime-300">
                {card.title}
              </h3>
              <Button
                className="bg-transparent hover:bg-transparent"
                onClick={() => handleDeleteDevice(card.id)}
              >
                <IoMdClose className="text-red-600 text-xl" />
              </Button>
            </div>

            <span className="text-sm text-gray-500">
              Ubicación: {card.deviceLocation}
            </span>

            <div className="text-gray-600">
              {
                <PowerChartComponent
                  customTooltip={CustomTooltip}
                  data={card.chartData}
                />
              }
            </div>
          </div>
        ))}

        {/* Formulario para agregar nueva card (condicional) */}
        {showForm && (
          <div className="bg-black shadow-md rounded-lg p-4 border border-gray-700">
            <h3 className="text-center font-semibold text-lg mb-4 text-white">
              Nuevo Dispositivo
            </h3>
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="deviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-white">
                        Nombre del dispositivo
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre del dispositivo"
                          {...field}
                          className="bg-transparent border border-gray-600 text-white focus-visible:ring-lime-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 animate-pulse" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-white">
                        ID del dispositivo
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ID del dispositivo"
                          {...field}
                          className="bg-transparent border border-gray-600 text-white focus-visible:ring-lime-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 animate-pulse" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deviceLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-white">
                        Ubicación del dispositivo
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent border border-gray-600 text-white focus-visible:ring-lime-500">
                            <SelectValue placeholder="Cocina" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-black text-white">
                          <SelectItem value="Cocina">Cocina</SelectItem>
                          <SelectItem value="Baño">Baño</SelectItem>
                          <SelectItem value="Dormitorio">Dormitorio</SelectItem>
                          <SelectItem value="Sala">Sala</SelectItem>
                          <SelectItem value="Garaje">Garaje</SelectItem>
                          <SelectItem value="Jardín">Jardín</SelectItem>
                          <SelectItem value="Oficina">Oficina</SelectItem>
                          <SelectItem value="Balcón">Balcón</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 animate-pulse" />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-2 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-lime-500 hover:bg-lime-600 text-black"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Agregando...
                      </>
                    ) : (
                      "Agregar"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-red-700 bg-red-700 text-black hover:bg-red-900"
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* Botón para agregar nueva card (solo visible si no se está mostrando el formulario) */}
        {!showForm && cards.length % 3 !== 0 && (
          <button
            onClick={addNewCard}
            className="h-full min-h-32 flex items-center justify-center border-2 border-dashed border-lime-400 rounded-lg p-4 hover:bg-lime-400 hover:border-lime-400 transition-colors"
          >
            <div className="flex flex-col items-center text-lime-500">
              <Plus className="w-8 h-8 mb-2" />
              <span>Agregar nuevo dispositivo</span>
            </div>
          </button>
        )}
      </div>

      {/* Si la última fila tiene 3 cards completas y no se muestra el formulario, mostramos el botón en una nueva fila */}
      {!showForm && cards.length % 3 === 0 && (
        <div className="mt-4">
          <button
            onClick={addNewCard}
            className="w-full md:w-1/3 min-h-32 flex items-center justify-center border-2 border-dashed border-lime-400 rounded-lg p-4 hover:bg-lime-400 hover:border-lime-400 transition-colors"
          >
            <div className="flex flex-col items-center text-lime-500">
              <Plus className="w-8 h-8 mb-2" />
              <span>Agregar nuevo dispositivo</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CardGrid;
