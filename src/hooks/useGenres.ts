import genres from "@/data/genres";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { FetchDataResponse } from "./useData";

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

const useGenres = () => 
  useQuery<Genre[], Error>({
      queryKey: ["genres"],
      queryFn: () => 
        apiClient
          .get<FetchDataResponse<Genre>>("/genres")
          .then((res) => res.data.results),
      staleTime: Infinity,
      refetchOnWindowFocus: false, // disable unwanted trigger
      refetchInterval: (query) =>  { 
        // the strategy is to start off by loading static data with the
        // initialData property and then using an interval, check for new
        // data one time in the background
        // this way, the user will never see a loading spinner
        // if we never fetched the data (ie: render from cache)
        // then we force a refetch immediately
        // otherwise we never refetch 
        return (query.state.dataUpdateCount > 0) ? Infinity: 1;
        },
      initialData: genres // initialize cache with static data to show results to the user immediately
  })

export default useGenres;