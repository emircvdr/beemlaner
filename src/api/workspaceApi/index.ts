import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const createWorkspace = async (workspace: {
  name: string;
  admin_id: string;
  color: string;
  icon: string;
}) => {
  const { data, error } = await supabase
    .from("workspaces")
    .insert([
      {
        name: workspace.name,
        admin_id: workspace.admin_id,
        color: workspace.color,
        icon: workspace.icon,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getWorkspaces = async () => {
  const { data, error } = await supabase.from("workspaces").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
