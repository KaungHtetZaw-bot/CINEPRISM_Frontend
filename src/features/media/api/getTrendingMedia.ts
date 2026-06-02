import api from "../../../app/api/axios";

export const getTrendingMedia = async () => {
  const { data } = await api.get('/media/trending');
  return data.results;
};