import APIClient, { FetchDataResponse } from "./api-client";
import { Game } from "../entities/Game";

const GetGameDetailService = (slug: string) => new APIClient<Game>(`/games/${slug}`);
export {GetGameDetailService};
export default new APIClient<FetchDataResponse<Game>>("/games");