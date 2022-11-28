import { useQuery } from "react-query"


const useGetEpisodes = (id?: number)  => {
    const queryInfo = useQuery<any, any>(["episodes", {id}], () => fetch(`https://api.tvmaze.com/shows/${id}/episodes`).then(res => res.json()), {enabled: !! id})
   
    return queryInfo 
};

export default useGetEpisodes;