import { create } from "zustand";

export interface User {
  iat: number
  userId: string
  userIsAdmin: number
  username: string
}

interface UserState {
  user: User | null;
}

export const useUser = create<UserState>()((set) => ({
  user: null
}));
