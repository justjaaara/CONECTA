import CardGrid from "@/app/protected/home/Cards";
import type { Device } from "@/app/protected/home/Cards";
import {
  getCurrentSession,
  getDevices,
  getMonthlyMeasurements,
} from "@/app/actions";
import PowerChartComponent from "./PowerChartComponent";

async function MyHome() {
  let cards: Device[] = [];
  const { user } = await getCurrentSession();
  if (user) {
    const { status, devices } = await getDevices(user);
    if (status && devices) {
      // Para cada dispositivo, obtenemos sus mediciones mensuales
      cards = await Promise.all(
        devices.map(async (device) => {
          const { measurements } = await getMonthlyMeasurements(
            device.device_id
          );
          return {
            id: device.device_id,
            title: device.device_name,
            deviceLocation: device.location,
            chartData: measurements, // <-- datos para la gráfica
          };
        })
      );
    }
  }
  return <CardGrid initialCards={cards} />;
}

export default MyHome;
