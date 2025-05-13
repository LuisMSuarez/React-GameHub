import { GameQuery } from "@/App";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { FetchDataResponse } from "./useData";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  parent_platforms: { platform: Platform} []
  metacritic: number | null;
  rating_top: number; // 1, 2, 3, 4, or 5
}

const useGames = (gameQuery: GameQuery) => {
  const params = {
    genres: gameQuery.genre?.slug,
    parent_platforms: gameQuery.platforms?.map(p => p.id).join(","),
    ordering: gameQuery.ordering,
    search: gameQuery.search,
    page: gameQuery.pageNumber,
    page_size: gameQuery.pageSize
  };

  const response = useQuery<FetchDataResponse<Game>, Error>({
        queryKey: ["games", params],
        queryFn: () => 
          apiClient
            .get<FetchDataResponse<Game>>("/games", {
              params: params
            })
            .then((res) => res.data),
        staleTime: 1000 * 60 * 60 * 1 // 1 hour
    })

    return { data: response.data?.results, error: response.error, isLoading: response.isLoading, count: response.data?.count }

}

export default useGames;