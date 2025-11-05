import { useQuery } from "@tanstack/react-query";
import { GetGameMoviesService } from "@/services/gamesService";
import { Movie } from "@/entities/Movie";
import { FetchDataResponse } from "@/services/api-client";

const useGameMovies = (gameId: string) => {
  const getGameMoviesSvc = GetGameMoviesService(gameId);

  return useQuery<FetchDataResponse<Movie> | null, Error>({
    queryKey: ["movies", { gameId }],
    queryFn: async () => {
      try {
        return await getGameMoviesSvc.get({});
      } catch (error: any) {
        if (error.response?.status === 404) {
          throw new Error("Game not found (404)");
        }
        throw error; // Re-throw other errors
      }
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });
};

export default useGameMovies;
