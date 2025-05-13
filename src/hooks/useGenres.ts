//import genres from "@/data/genres";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/api-client";
import { FetchDataResponse } from "./useData";
// uncomment these lines to fall back to server call instead of cached data
// const useGenres = () => ({ data : genres, error: "", isLoading: false });
// import useData from "./useData";

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
      staleTime: 10* 1000
  })

export default useGenres;