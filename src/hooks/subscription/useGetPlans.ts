import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useGetPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data } = await api.get("/plans");
      return data.data ?? data;
    },
    staleTime: 1000 * 60 * 10,
  });
};