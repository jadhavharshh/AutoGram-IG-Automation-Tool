// useAuthSlice.ts
export interface AuthState {
  userInfo: { id: string; email: string } | undefined;
  setUserInfo: (user: { id: string;  email: string }) => void;
}

export const createAuthSlice = (set: any): AuthState => ({
  userInfo: undefined, // initial state
  setUserInfo: (user) => set({ userInfo: user }),
});
