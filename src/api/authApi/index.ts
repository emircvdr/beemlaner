import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const getURL = () => {
  let url =
    import.meta.env.VITE_APP_URL ?? // Set this to your site URL in production env.
    "http://localhost:5173/";
  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

export async function Register(form: {
  email: string;
  password: string;
  fullname: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      emailRedirectTo: "http://localhost:5173/",
      data: {
        fullname: form.fullname,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function Login(form: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function Logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function GetUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function GetUserSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function ResetPasswordUser(form: { email: string }) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    form.email,
    {
      redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function UpdatePassword(form: { password: string }) {
  const { data, error } = await supabase.auth.updateUser({
    password: form.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:5173/$id",
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://mitlqqqzqndszteylyeg.supabase.co/auth/v1/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
