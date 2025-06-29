import { create } from 'zustand';

type User = {
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

// This is a placeholder store for future use.
// It would be populated after a successful login via your chosen auth provider.
export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
