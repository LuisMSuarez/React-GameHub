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
  metacritic: number;
}

interface Props {
  selectedGenre: string;
}

const useGames = ({selectedGenre}: Props) => {
  const params = selectedGenre === '' ? {} : { genres: selectedGenre };
  return useData<Game>("/games", params, [selectedGenre]);
}

export default useGames;