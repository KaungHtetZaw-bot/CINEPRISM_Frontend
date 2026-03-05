import { useMutation,useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post("/purchases", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
};

export const useGetMyPurchases = () => {
  return useQuery({
    queryKey: ["purchases"],
    queryFn: async () => {
      const { data } = await api.get("/purchases");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};