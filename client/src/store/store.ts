import {create} from 'zustand';
import { createAuthSlice, AuthState } from './slices/AuthSlice';
import { createAppSlice } from './slices/AppSlice';

// Combine all slices into one main store
const userAppStore = create<AuthState>((set) => ({
  ...createAuthSlice(set),  // Add auth slice
  ...createAppSlice(set),   // Add app slice
}));

export default userAppStore;
