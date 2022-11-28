import { useQuery } from "react-query"

const useFetchShows = ()  => {
    const queryInfo = useQuery<any, any>(["allShows"], () => fetch("https://api.tvmaze.com/shows").then(res => res.json()))
   
    return queryInfo 
};

export default useFetchShows;