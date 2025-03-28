import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const getUser = async (id: string) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .neq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const testInsert = async (
  id: string,
  fullname: string,
  email: string,
  is_setup_profile: boolean,
  username: string,
  avatar_options: any
) => {
  const { data, error } = await supabase.from("user_profiles").insert({
    id: id,
    fullname: fullname,
    email: email,
    is_setup_profile: is_setup_profile,
    username: username,
    avatar_options: avatar_options,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
