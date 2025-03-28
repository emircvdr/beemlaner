import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const getWorkspaceUsers = async (p_workspace_id: string) => {
  const { data, error } = await supabase.rpc("get_workspace_users", {
    p_workspace_id: p_workspace_id,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createWorkspaceUser = async (
  workspace_id: string,
  user_id: string,
  role: string
) => {
  const { data, error } = await supabase.from("workspace_users").insert({
    workspace_id: workspace_id,
    user_id: user_id,
    role: role,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
