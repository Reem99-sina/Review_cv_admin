import { apiRequest } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => apiRequest("/api/reviews"),
  });
}

export function useReviewById({ id }: { id: string }) {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => apiRequest("/api/reviews/" + id),
    enabled: !!id,
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/api/reviews/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}