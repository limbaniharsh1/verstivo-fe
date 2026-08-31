import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface UserProfile {
  id: string;
  firstname?: string;
  lastname?: string;
  mobile: string;
  email?: string;
}

export interface UserResponse {
  status: number;
  message: string;
  data: {
    user: UserProfile;
    accessToken?: string;
    refreshToken?: string;
  };
}

export function useUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const res = await apiClient.get<UserResponse>("/users/me");
        return res.data?.user || null;
      } catch (err: any) {
        // Return null for guests/unauthenticated users/errors to prevent app crashing/popups
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

export function useLoginOrSignup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { mobile: string; firstname?: string; lastname?: string; email?: string }) =>
      apiClient.post<UserResponse>("/users/login", data),
    onSuccess: (res) => {
      // Set the user query data directly or invalidate
      queryClient.setQueryData(["currentUser"], res.data?.user);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { firstname: string; lastname: string; email: string }) =>
      apiClient.put<UserResponse>("/users/profile", data),
    onSuccess: (res) => {
      queryClient.setQueryData(["currentUser"], res.data?.user);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.post("/users/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export function useRequestMobileChangeOtp() {
  return useMutation({
    mutationFn: (data: { mobile: string }) =>
      apiClient.post<{ status: number; message: string; data: { otp: string } }>("/users/change-mobile-otp", data),
  });
}

export function useVerifyMobileChange() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { mobile: string; otp: string }) =>
      apiClient.post<UserResponse>("/users/verify-change-mobile", data),
    onSuccess: (res) => {
      queryClient.setQueryData(["currentUser"], res.data?.user);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}


