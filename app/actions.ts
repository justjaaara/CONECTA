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
import type { DeviceConsumptionRecord } from "@/types/types";

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
