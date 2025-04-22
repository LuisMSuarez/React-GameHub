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

const useGames = (selectedGenre: string, selectedPlatform: string) => {
  let params: { genres?: string; parent_platforms?: string } = {};
  
  if (selectedGenre !== '' )
  {
    params.genres = selectedGenre;
  }
  if (selectedPlatform !== '' )
  {
    params.parent_platforms = selectedPlatform;
  }

  return useData<Game>("/games", params, [selectedGenre, selectedPlatform]);
}

export default useGames;