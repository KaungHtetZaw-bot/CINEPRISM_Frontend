import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useGetPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await api.get("/payments");
      return data.data ?? data;
    },
    staleTime: 1000 * 60 * 10,
  });
};