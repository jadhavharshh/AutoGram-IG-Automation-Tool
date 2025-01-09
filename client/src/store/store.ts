import {create} from 'zustand';
import { createAuthSlice, AuthState } from './slices/AuthSlice';

// Combine all slices into one main store
const userAppStore = create<AuthState>((set) => ({
  ...createAuthSlice(set),  // Add auth slice
}));

export default userAppStore;
