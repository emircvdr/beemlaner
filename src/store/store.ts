import { create } from "zustand";

type UserStore = {
  userId: string | null;
  setUserId: (id: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  setUserId: (id: string) => set({ userId: id }),
}));

type WorkspaceStore = {
  workspaces: [] | null;
  setWorkspaces: (workspaces: []) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: null,
  setWorkspaces: (workspaces: []) => set({ workspaces: workspaces }),
}));

type UserAllDataStore = {
  userAllData: [] | null;
  setUserAlldata: (userAllData: []) => void;
};

export const useUserAllDataStore = create<UserAllDataStore>((set) => ({
  userAllData: null,
  setUserAlldata: (userAllData: []) => set({ userAllData: userAllData }),
}));
