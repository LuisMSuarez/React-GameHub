import genres from "@/data/genres";

const useGenres = () => ({ data : genres, error: "", isLoading: false });

export default useGenres;