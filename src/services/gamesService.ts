import { Platform } from "@/hooks/usePlatforms";
import APIClient, { FetchDataResponse } from "./api-client";

export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  rating: number;
  parent_platforms: { platform: Platform} []
  metacritic: number | null;
  rating_top: number; // 1, 2, 3, 4, or 5
  description_raw: string;
}

const GetGameDetailService = (slug: string) => new APIClient<Game>(`/games/${slug}`);
export {GetGameDetailService};
export default new APIClient<FetchDataResponse<Game>>("/games");