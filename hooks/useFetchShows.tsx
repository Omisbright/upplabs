import { useQuery } from "react-query"

const useFetchShows = ()  => {
    const queryInfo = useQuery<any, any>(["allShows"], () => fetch("https://api.tvmaze.com/shows").then(res => res.json()))
   
    return queryInfo 
};

const useGetSeriesInformation = (id?: number)  => {
    const queryInfo = useQuery<any, any>(["seriesInfo", {id}], () => fetch(`https://api.tvmaze.com/shows/${id}`).then(res => res.json()), {enabled: !! id})
   
    return queryInfo 
};

const useGetEpisodes = (id?: number)  => {
    const queryInfo = useQuery<any, any>(["episodes", {id}], () => fetch(`https://api.tvmaze.com/shows/${id}/episodes`).then(res => res.json()), {enabled: !! id})
   
    return queryInfo 
};

export  { useFetchShows, useGetSeriesInformation, useGetEpisodes };