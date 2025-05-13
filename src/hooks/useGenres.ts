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
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
      initialData: genres // initialize cache with static data to show results to the user immediately
  })

export default useGenres;