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

export const getWorkspaceInvites = async (receiver_id: string) => {
  const { data, error } = await supabase.rpc(
    "get_workspace_invite_by_recr_id",
    {
      receiver_id: receiver_id,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const acceptInvite = async (invite_id: string) => {
  const { data, error } = await supabase
    .from("workspace_invites")
    .update({
      status: "accepted",
      is_accepted: true,
      accepted_at: new Date(),
    })
    .eq("id", invite_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
