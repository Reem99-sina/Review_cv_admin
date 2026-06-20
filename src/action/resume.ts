import { apiRequest } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useResumes() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: () => apiRequest("/api/resumes"),
  });
}

export function useResumeById({ id }: { id: string }) {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: () => apiRequest("/api/resumes/" + id),
    enabled: !!id,
  });
}
export function useDeleteResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/resumes/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });
      toast.success(data?.message || "User upgraded successfully");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to upgrade user");
    },
  });
}
