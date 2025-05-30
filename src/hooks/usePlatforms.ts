import platforms from "@/data/platforms";

// uncomment these lines to fall back to server call instead of cached data
// import useData from "./useData";
// const usePlatforms = () => useData<Platform>("/platforms/lists/parents", {}, []);
const usePlatforms = () => ({data: platforms, error: "", isLoading: false });

export default usePlatforms;