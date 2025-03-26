import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const inviteUser = async (
  workspace_id: string,
  sender_id: string,
  receiver_id: string,
  email: string,
  status: string,
  is_accepted: boolean
) => {
  const { data, error } = await supabase.from("workspace_invites").insert({
    workspace_id,
    sender_id,
    receiver_id,
    email,
    status,
    is_accepted,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
