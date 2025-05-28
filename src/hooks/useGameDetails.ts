import { useQuery } from "@tanstack/react-query";
import { Game, GetGameDetailService } from "@/services/gamesService";

const useGameDetails = (slug: string) => {

  const getGameDetailsSvc = GetGameDetailService(slug);

  return useQuery<Game, Error>({
        queryKey: ["games", ({slug})],
        queryFn: () => { return getGameDetailsSvc.get({}); },
        staleTime: 1000 * 60 * 60 * 1 // 1 hour
    });
}

export default useGameDetails;