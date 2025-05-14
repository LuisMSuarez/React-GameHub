import { GameQuery } from "@/App";
import { FetchDataResponse } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import gamesService, { Game } from "@/services/gamesService";

const useGames = (gameQuery: GameQuery) => {
  const params = {
    genres: (gameQuery.genre) ? gameQuery.genre.slug : undefined,
    parent_platforms: (gameQuery.platforms.length > 0 ) ? gameQuery.platforms.map(p => p.id).join(",") : undefined,
    ordering: (gameQuery.ordering !== '' ) ? gameQuery.ordering : undefined,
    search: (gameQuery.search !== '' ) ? gameQuery.search : undefined,
    page: gameQuery.pageNumber,
    page_size: gameQuery.pageSize
  };

  const response = useQuery<FetchDataResponse<Game>, Error>({
        queryKey: ["games", params],
        queryFn: () => gamesService.get(params),
        staleTime: 1000 * 60 * 60 * 1 // 1 hour
    })

    return { data: response.data?.results, error: response.error, isLoading: response.isLoading, count: response.data?.count }

}

export default useGames;