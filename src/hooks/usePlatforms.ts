import useData from "./useData";

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () => useData<Genre>("/platforms/lists/parents", {}, []);

export default usePlatforms;