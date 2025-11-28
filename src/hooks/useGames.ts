import { FetchDataResponse } from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import gamesService from "@/services/gamesService";
import { Game } from "@/entities/Game";
import useGameQueryStore from "@/store/gameQueryStore";

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  const params = {
    genres: gameQuery.genre ? gameQuery.genre.slug : undefined,
    parent_platforms:
      gameQuery.platforms.length > 0
        ? gameQuery.platforms.map((p) => p.id).join(",")
        : undefined,
    ordering: gameQuery.ordering !== "" ? gameQuery.ordering : undefined,
    search: gameQuery.search !== "" ? gameQuery.search : undefined,
    page_size: gameQuery.pageSize,
  };

  const response = useInfiniteQuery<FetchDataResponse<Game>, Error>({
    queryKey: ["games", params],
    queryFn: async ({ pageParam }) => {
      try {
        return await gamesService.get({ ...params, page: pageParam }, {});
      } catch (error: any) {
        console.log(error);
        if (error.response?.status === 404) {
          // Return a canned response if the API returns a 404
          return {
            count: 0,
            results: [],
            previous: null,
            next: null,
            isLastPage: true, // sentinel to mark this as the last page of data
          } as FetchDataResponse<Game>;
        }
        throw error; // Re-throw other errors
      }
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.isLastPage || lastPage.next === null) {
        return undefined;
      } else {
        return allPages.length + 1;
      }
    },
  });

  // hide the complexity of pages of data from the caller by flattening out the response
  return {
    data: response.data?.pages.flatMap((page) => page.results) || [],
    error: response.error,
    isLoading: response.isLoading,
    count: response.data?.pages[0]?.count || 0,
    fetchNextPage: response.fetchNextPage,
    hasNextPage: response.hasNextPage,
  };
};

export default useGames;
