export interface AuthState {
  userInfo: { id: string; email: string } | null | undefined;
  setUserInfo: (user: { id: string; email: string } | null) => void;
}

export const createAuthSlice = (set: any): AuthState => ({
  userInfo: undefined, // initial state
  setUserInfo: (user) => set({ userInfo: user }),
});