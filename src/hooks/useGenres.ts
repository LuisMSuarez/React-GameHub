//import genres from "@/data/genres";

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

import { useQuery } from "@tanstack/react-query";
// uncomment these lines to fall back to server call instead of cached data
// const useGenres = () => ({ data : genres, error: "", isLoading: false });

// import useData from "./useData";
import axios from "axios";

interface FetchDataResponse<T> {
  count: number;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "https://gamers-hub-api.azurewebsites.net/v1"
});

const useGenres = () => 
{  
  return useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: () => 
      {
        return axiosInstance
        .get<FetchDataResponse<Genre>>("/genres")
        .then((res) => res.data.results);
      },
    staleTime: 10* 1000
  });
}

export default useGenres;