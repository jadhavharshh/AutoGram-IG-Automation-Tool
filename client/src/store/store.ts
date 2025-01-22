import { create } from 'zustand';
import { createAuthSlice, AuthState } from './slices/AuthSlice';
import { createAppSlice, AppState } from './slices/AppSlice'; // Ensure AppSlice exists
import { createIgStore, IgStoreState } from './slices/IgStore';

// Combine all slices into one main store
interface StoreState extends AuthState, AppState, IgStoreState {}

const useStore = create<StoreState>((set) => ({
  ...createAuthSlice(set),
  ...createAppSlice(set),
  ...createIgStore(set),
}));

export default useStore;