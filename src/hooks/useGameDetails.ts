import { useQuery } from "@tanstack/react-query";
import { GetGameDetailService } from "@/services/gamesService";
import { Game } from "@/entities/Game";
import useGameQueryStore from "@/store";

const useGameDetails = (slug: string) => {
  const getGameDetailsSvc = GetGameDetailService(slug);
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  const params: Record<string, string> = {};
  if (gameQuery.language) {
    params.language = gameQuery.language;
  }

  return useQuery<Game | null, Error>({
    queryKey: ["games", { slug, ...params }],
    queryFn: async () => {
      try {
        return await getGameDetailsSvc.get(params, {});
      } catch (error: any) {
        if (error.response?.status === 403) {
          throw new Error("Access forbidden (403)");
        }
        if (error.response?.status === 404) {
          throw new Error("Game not found (404)");
        }
        throw error; // Re-throw other errors
      }
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    retry: (failureCount, error: any) => {
      // Don't retry for 403 or 404 errors
      if (
        error?.message === "Access forbidden (403)" ||
        error?.message === "Game not found (404)"
      ) {
        return false;
      }
      return failureCount < 3; // Default: retry up to 3 times for other errors
    },
  });
};

export default useGameDetails;
