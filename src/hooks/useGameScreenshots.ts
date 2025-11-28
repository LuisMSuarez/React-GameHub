import { useQuery } from "@tanstack/react-query";
import { GetGameScreenshotsService } from "@/services/gamesService";
import { Screenshot } from "@/entities/Screenshot";
import { FetchDataResponse } from "@/services/api-client";

const useGameScreenshots = (gameId: string) => {
  const getGameScreenshotsSvc = GetGameScreenshotsService(gameId);

  return useQuery<FetchDataResponse<Screenshot> | null, Error>({
    queryKey: ["screenshots", { gameId }],
    queryFn: async () => {
      try {
        return await getGameScreenshotsSvc.get({}, {});
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

export default useGameScreenshots;
