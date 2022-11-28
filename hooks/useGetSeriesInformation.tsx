import { useQuery } from "react-query"

const useGetSeriesInformation = (id?: number)  => {
    const queryInfo = useQuery<any, any>(["seriesInfo", {id}], () => fetch(`https://api.tvmaze.com/shows/${id}`).then(res => res.json()), {enabled: !! id})
   
    return queryInfo 
};

export default useGetSeriesInformation;