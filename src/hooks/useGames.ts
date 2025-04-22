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

const useGames = (selectedGenre: string, selectedPlatforms: string[]) => {
  let params: { genres?: string; parent_platforms?: string } = {};
  
  if (selectedGenre !== '' )
  {
    params.genres = selectedGenre;
  }
  if (selectedPlatforms.length > 0 )
  {
    params.parent_platforms = selectedPlatforms.join(",");
  }

  return useData<Game>("/games", params, [selectedGenre, selectedPlatforms]);
}

export default useGames;