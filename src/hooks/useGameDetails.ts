import { useQuery } from "@tanstack/react-query";
import { Game, GetGameDetailService } from "@/services/gamesService";

const useGameDetails = (slug: string) => {

  const getGameDetailsSvc = GetGameDetailService(slug);

    return useQuery<Game | null, Error>({
    queryKey: ["games", { slug }],
    queryFn: async () => {
        try {
            return await getGameDetailsSvc.get({});
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
}

export default useGameDetails;