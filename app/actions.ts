"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Session } from "@supabase/supabase-js";

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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      status: "error",
      message: "No active session",
    };
  }

  return {
    status: "success",
    session,
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
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return {
      status: false,
      session,
    };
  }
  return {
    status: true,
    session,
  };
};

export const hasProfile = async (session: Session) => {
  const supabase = await createClient();

  let { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id)
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
// import { encodedRedirect } from "@/utils/utils";
// import { createClient } from "@/utils/supabase/server";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";

// export const signUpAction = async (formData: FormData) => {
//   const email = formData.get("email")?.toString();
//   const password = formData.get("password")?.toString();
//   const supabase = await createClient();
//   const origin = (await headers()).get("origin");

//   if (!email || !password) {
//     return encodedRedirect(
//       "error",
//       "/sign-up",
//       "Email and password are required",
//     );
//   }

//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback`,
//     },
//   });

//   if (error) {
//     console.error(error.code + " " + error.message);
//     return encodedRedirect("error", "/sign-up", error.message);
//   } else {
//     return encodedRedirect(
//       "success",
//       "/sign-up",
//       "Thanks for signing up! Please check your email for a verification link.",
//     );
//   }
// };

// export const signInAction = async (formData: FormData) => {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const supabase = await createClient();

//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return encodedRedirect("error", "/sign-in", error.message);
//   }

//   return redirect("/protected");
// };

// export const forgotPasswordAction = async (formData: FormData) => {
//   const email = formData.get("email")?.toString();
//   const supabase = await createClient();
//   const origin = (await headers()).get("origin");
//   const callbackUrl = formData.get("callbackUrl")?.toString();

//   if (!email) {
//     return encodedRedirect("error", "/forgot-password", "Email is required");
//   }

//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
//   });

//   if (error) {
//     console.error(error.message);
//     return encodedRedirect(
//       "error",
//       "/forgot-password",
//       "Could not reset password",
//     );
//   }

//   if (callbackUrl) {
//     return redirect(callbackUrl);
//   }

//   return encodedRedirect(
//     "success",
//     "/forgot-password",
//     "Check your email for a link to reset your password.",
//   );
// };

// export const resetPasswordAction = async (formData: FormData) => {
//   const supabase = await createClient();

//   const password = formData.get("password") as string;
//   const confirmPassword = formData.get("confirmPassword") as string;

//   if (!password || !confirmPassword) {
//     encodedRedirect(
//       "error",
//       "/protected/reset-password",
//       "Password and confirm password are required",
//     );
//   }

//   if (password !== confirmPassword) {
//     encodedRedirect(
//       "error",
//       "/protected/reset-password",
//       "Passwords do not match",
//     );
//   }

//   const { error } = await supabase.auth.updateUser({
//     password: password,
//   });

//   if (error) {
//     encodedRedirect(
//       "error",
//       "/protected/reset-password",
//       "Password update failed",
//     );
//   }

//   encodedRedirect("success", "/protected/reset-password", "Password updated");
// };

// export const signOutAction = async () => {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
//   return redirect("/sign-in");
// };
