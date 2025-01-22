import { apiClient } from '@/lib/api-client';
import { GET_INSTAGRAM_PROFILES } from '@/utils/constants';
import { toast } from 'sonner';

interface IGUser {
  _id: string;
  userId: string;
  igUsername: string;
  igPassword: string;
  createdAt: string;
}

export interface IgStoreState {
  igAccounts: IGUser[];
  fetchIgAccounts: () => Promise<void>;
}

export const createIgStore = (set: any): IgStoreState => ({
  igAccounts: [],
  fetchIgAccounts: async () => {
    try {
      console.log("IgStore: Calling fetchIgAccounts");
      const response = await apiClient.get(GET_INSTAGRAM_PROFILES, { withCredentials: true });
      
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        set({ igAccounts: response.data });
        console.log("IgStore: Fetched igAccounts:", response.data);
      } else {
        console.error("IgStore: Unexpected response format:", response.data);
        toast.error("Unexpected response format from server.");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        console.error("IgStore Error Message:", error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("IgStore Unknown Error:", error);
      }
    }
  },
});