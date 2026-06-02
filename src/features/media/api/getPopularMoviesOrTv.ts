import api from "../../../app/api/axios";

export const getPopularMoivesOrTv = async ( mediaType: 'movie' | 'tv', pageParam:Number = 1 ) => {
    const { data } = await api.get(`/media/popular/${mediaType}?page=${pageParam}`)
    return data;
}