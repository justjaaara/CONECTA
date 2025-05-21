"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { cache } from "react";
import { measurement, yearly_measurement } from "@/types/types";
import {
  DeviceConsumption,
  ConsumptionSummary,
} from "@/hooks/useDeviceConsumptionData";
import type {
  DailyConsumptionData,
  DailyConsumptionRecord,
  DailyConsumptionSummary,
  DeviceConsumptionRecord,
  MonthlyConsumption,
} from "@/types/types";

export const signUpAction = async (formData: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const { email, password } = formData;

  // Hago la autenticación con supabase
  const supabase = await createClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?type=signup`,
    },
  });
  if (authError) {
    console.error(authError.code + " " + authError.message);
    return {
      status: "error",
      message: authError.message,
      path: "/sign-up",
    };
  }

  return {
    status: "success",
    message: "User signed up successfully",
  };
};

export const getCurrentSession = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "error",
      message: "No active session",
    };
  }

  return {
    status: "success",
    user,
  };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }

  redirect("/sign-in");
};

export const logInAction = async (formData: {
  email: string;
  password: string;
}) => {
  const { email, password } = formData;
  const supabase = await createClient();

  const { data, error: logInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (logInError) {
    console.error(logInError.code + " " + logInError.message);
    return {
      status: "error",
      message: logInError.message,
    };
  }

  return {
    status: "success",
    message: "User logged in successfully",
    path: "/protected/dashboard",
  };
};

export const isLoggedIn = async () => {
  const { user } = await getCurrentSession();
  if (!user) {
    return {
      status: false,
      user,
    };
  }
  return {
    status: true,
    user,
  };
};

export const hasProfile = async (user: User) => {
  const supabase = await createClient();

  let { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error.message);
    return {
      status: false,
      profile: null,
    };
  }

  if (profile) {
    return {
      status: true,
      profile,
    };
  }
  return {
    status: false,
    profile: null,
  };
};

export const getProfile = async (user: User) => {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) {
    console.error(error.message);
    return {
      status: false,
      profile: null,
    };
  }
  if (profile) {
    return {
      status: true,
      profile,
    };
  }
  return {
    status: false,
    profile: null,
  };
};

export const getDevices = async (user: User) => {
  const supabase = await createClient();
  let { data: devices, error } = await supabase
    .from("devices")
    .select("*")
    .eq("user_id_associated", user.id);

  if (error) {
    console.error(error.message);
    return {
      status: false,
      devices: [],
    };
  }

  return {
    status: true,
    devices: devices || [],
  };
};

type Device = {
  deviceId: string;
  deviceName: string;
  deviceLocation: string;
};

export const insertDevice = async (device: Device, user: User) => {
  const supabase = await createClient();

  const { deviceId, deviceName, deviceLocation } = device;
  const { data, error } = await supabase
    .from("devices")
    .insert([
      {
        device_id: deviceId,
        device_name: deviceName,
        location: deviceLocation,
        user_id_associated: user.id,
      },
    ])
    .select();
  if (error) {
    console.error(error.message);
    return {
      status: false,
      data: null,
    };
  }
  return {
    status: true,
    data,
  };
};

export const removeDevice = async (deviceId: string, userId: string) => {
  const deviceIdNumber = Number(deviceId);
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("delete_device_and_measurements", {
    p_device_id: deviceIdNumber, // tipo number
    p_user_id: userId, // tipo string (uuid)
  });

  if (error) {
    console.error("Error during RPC call:", error.message);
    return { status: false };
  }

  return { status: data }; // true si se eliminó, false si no coincidía
};

export const getDeviceMonthlyMeasurements = async (deviceId: string) => {
  const deviceIdNumber = Number(deviceId);
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_monthly_power_consumption", {
    p_device_id: deviceIdNumber,
  });

  if (error) {
    console.error(error.message);
    return {
      status: false,
      measurements: [],
    };
  }

  return {
    status: true,
    measurements: data || [],
  };
};

export const getUserWeeklyMeasurements = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_user_weekly_consumption", {
    user_id_param: userId,
  });

  if (error) {
    console.error(error.message);
    return {
      status: false,
      measurements: [],
    };
  }

  return {
    status: true,
    measurements: (data as measurement[]) || [],
  };
};

export const getUserYearlyMeasurements = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_user_yearly_consumption", {
    user_id_param: userId,
  });

  if (error) {
    console.error(error.message);
    return {
      status: false,
      yearly_consumption: [],
    };
  }

  return {
    status: true,
    yearly_consumption: (data as yearly_measurement[]) || [],
  };
};

export async function getDeviceConsumptionByPeriod(
  year: number,
  month: number
): Promise<ConsumptionSummary | null> {
  try {
    const supabase = await createClient();
    // Consulta utilizando el procedimiento almacenado
    const { data, error } = await supabase.rpc(
      "get_device_consumption_by_period",
      {
        p_year: year,
        p_month: month,
      }
    );

    if (error) {
      console.error("Error al ejecutar el procedimiento almacenado:", error);
      return null;
    }

    if (!data || data.length === 0) {
      return {
        totalConsumption: 0,
        deviceConsumption: [],
        highestConsumption: null,
        lowestConsumption: null,
      };
    }

    // Transformar datos con el tipo correcto
    const deviceConsumption: DeviceConsumption[] = data.map(
      (item: DeviceConsumptionRecord) => ({
        device_id: item.device_id,
        device_name: item.device_name,
        consumption:
          typeof item.consumption === "string"
            ? parseFloat(item.consumption)
            : item.consumption,
        location: item.location,
      })
    );

    // Calcular consumo total
    const totalConsumption = deviceConsumption.reduce(
      (sum, device) => sum + device.consumption,
      0
    );

    return {
      totalConsumption,
      deviceConsumption,
      highestConsumption: null, // Se calculará en la ruta API
      lowestConsumption: null, // Se calculará en la ruta API
    };
  } catch (error) {
    console.error("Error al obtener el consumo de dispositivos:", error);
    return null;
  }
}

export async function getUserMonthlyConsumption(): Promise<MonthlyConsumption | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const userId = user.id;
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-based

    const { data, error } = await supabase.rpc("get_user_monthly_consumption", {
      p_user_id: userId,
      p_year: currentYear,
      p_month: currentMonth,
    });

    if (error) {
      console.error("Error al obtener consumo mensual:", error);
      return null;
    }

    if (!data || data.length === 0) {
      return {
        currentConsumption: 0,
        previousConsumption: 0,
        percentageChange: 0,
        isIncrease: false,
      };
    }

    const currentConsumption = parseFloat(data[0].total_consumption);
    const previousConsumption = parseFloat(data[0].previous_consumption);

    // Calcular el porcentaje de cambio
    let percentageChange = 0;
    let isIncrease = false;

    if (previousConsumption > 0) {
      percentageChange = Math.abs(
        ((currentConsumption - previousConsumption) / previousConsumption) * 100
      );
      isIncrease = currentConsumption > previousConsumption;
    } else if (currentConsumption > 0) {
      // Si el mes anterior fue 0, pero este mes hay consumo, es un 100% de aumento
      percentageChange = 100;
      isIncrease = true;
    }

    return {
      currentConsumption,
      previousConsumption,
      percentageChange: Math.round(percentageChange),
      isIncrease,
    };
  } catch (error) {
    console.error("Error al obtener consumo mensual:", error);
    return null;
  }
}

export async function getUserDailyConsumption(
  year?: number,
  month?: number
): Promise<DailyConsumptionSummary | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const userId = user.id;
    const today = new Date();
    const targetYear = year || today.getFullYear();
    const targetMonth = month || today.getMonth() + 1; // JavaScript months are 0-based

    const { data, error } = await supabase.rpc("get_user_daily_consumption", {
      p_user_id: userId,
      p_year: targetYear,
      p_month: targetMonth,
    });

    if (error) {
      console.error("Error al obtener consumo diario:", error);
      return null;
    }

    if (!data || data.length === 0) {
      return {
        dailyData: [],
        highestConsumption: {
          day: 0,
          month: getMonthName(targetMonth),
          power: 0,
        },
        lowestConsumption: {
          day: 0,
          month: getMonthName(targetMonth),
          power: 0,
        },
      };
    }

    const dailyData: DailyConsumptionData[] = data.map(
      (item: DailyConsumptionRecord) => ({
        day_number: item.day_number,
        day_date: new Date(item.day_date).toISOString(),
        total_power: parseFloat(
          typeof item.total_power === "string"
            ? item.total_power
            : item.total_power.toString()
        ),
      })
    );

    // Encontrar el día con mayor consumo
    const maxConsumption = dailyData.reduce(
      (prev, current) =>
        current.total_power > prev.total_power ? current : prev,
      dailyData[0]
    );

    // Encontrar el día con menor consumo (solo días con consumo mayor a 0)
    const daysWithConsumption = dailyData.filter((day) => day.total_power > 0);
    const minConsumption =
      daysWithConsumption.length > 0
        ? daysWithConsumption.reduce(
            (prev, current) =>
              current.total_power < prev.total_power ? current : prev,
            daysWithConsumption[0]
          )
        : dailyData[0];

    return {
      dailyData,
      highestConsumption: {
        day: maxConsumption.day_number,
        month: getMonthName(targetMonth),
        power: maxConsumption.total_power,
      },
      lowestConsumption: {
        day: minConsumption.day_number,
        month: getMonthName(targetMonth),
        power: minConsumption.total_power,
      },
    };
  } catch (error) {
    console.error("Error al obtener consumo diario:", error);
    return null;
  }
}

// Función auxiliar para obtener el nombre del mes
function getMonthName(month: number): string {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return months[month - 1] || "";
}

export const getUserWeeklyMeasurementsCached = cache(async (userId: string) => {
  return getUserWeeklyMeasurements(userId);
});

export const getCurrentSessionCached = cache(async () => {
  return getCurrentSession();
});

export const getDevicesCached = cache(async (user: User) => {
  return getDevices(user);
});

export const getDeviceMonthlyMeasurementsCached = cache(
  async (deviceId: string) => {
    return getDeviceMonthlyMeasurements(deviceId);
  }
);

export const getUserYearlyMeasurementsCached = cache(async (userId: string) => {
  return getUserYearlyMeasurements(userId);
});
