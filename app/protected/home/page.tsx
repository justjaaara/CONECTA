import CardGrid from "@/app/protected/home/Cards";
import type { Card } from "@/app/protected/home/Cards";
import { getCurrentSession, getDevices } from "@/app/actions";

async function MyHome() {
  let cards: Card[] = [];
  const { user } = await getCurrentSession();
  if (user) {
    const { status, devices } = await getDevices(user);
    if (status && devices) {
      cards = devices.map((device) => ({
        id: device.device_id,
        title: device.device_name,
        deviceLocation: device.location,
        content: "Acá ira información de medidas del dispositivo",
      }));
    }
  }
  return <CardGrid initialCards={cards} />;
}

export default MyHome;
