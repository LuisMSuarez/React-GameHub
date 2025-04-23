import { GameQuery } from "@/App";
import useData from "./useData";

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
}

const useGames = (gameQuery: GameQuery) => {
  let params: { genres?: string; parent_platforms?: string, ordering?: string, search?: string } = {};
  
  if (gameQuery.genre !== '' )
  {
    params.genres = gameQuery.genre;
  }
  if (gameQuery.ordering !== '' )
  {
    params.ordering = gameQuery.ordering;
  }
  if (gameQuery.platforms.length > 0 )
  {
    params.parent_platforms = gameQuery.platforms.join(",");
  }
  if (gameQuery.search !== '' )
  {
    params.search = gameQuery.search;
  }

  return useData<Game>("/games", params, [gameQuery]);
}

export default useGames;