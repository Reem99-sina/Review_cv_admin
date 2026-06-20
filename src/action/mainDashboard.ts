import { apiRequest } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useMainDashboard() {
  return useQuery({
    queryKey: ["overview"],
    queryFn: () => apiRequest("/api/dashboard"),
    retry: false,
  });
}

export function useActivity() {
  return useQuery({
    queryKey: ["activity"],
    queryFn: () => apiRequest("/api/activity"),
    retry: false,
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiRequest("/api/users"),
    retry: false,
  });
}

/* ------------------ UPGRADE USER ------------------ */
export function useUpgradeUser() {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      return apiRequest("/api/users/upgrade", {
        method: "POST",
        body: { userId },
      });
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey:['users']
      })
      toast.success(data?.message || "User upgraded successfully");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to upgrade user");
    },
  });
}

/* ------------------ DELETE USER ------------------ */
export function useDeleteUser() {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      return apiRequest("/api/users/delete", {
        method: "POST",
        body: { userId },
      });
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey:['users']
      })
      toast.success(data?.message || "User deleted successfully");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete user");
    },
  });
}