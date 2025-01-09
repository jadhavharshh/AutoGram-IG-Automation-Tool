// useAppSlice.ts
export interface AppState {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
  }
  
  export const createAppSlice = (set: any): AppState => ({
    isLoading: false, // initial state
    setLoading: (loading) => set({ isLoading: loading }),
  });
  