//import genres from "@/data/genres";

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

// uncomment these lines to fall back to server call instead of cached data
import useData from "./useData";
const useGenres = () => useData<Genre>("/genres", {}, []);
// const useGenres = () => ({ data : genres, error: "", isLoading: false });

export default useGenres;