"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Session, User } from "@supabase/supabase-js";

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
