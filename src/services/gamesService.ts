import APIClient, { FetchDataResponse } from "./api-client";
import { Game } from "../entities/Game";
import { Movie } from "@/entities/Movie";
import { Screenshot } from "@/entities/Screenshot";

const GetGameDetailService = (gameId: string) => new APIClient<Game>(`/games/${gameId}`);
const GetGameMoviesService = (gameId: string) => new APIClient<FetchDataResponse<Movie>>(`/games/${gameId}/movies`);
const GetGameScreenshotsService = (gameId: string) => new APIClient<FetchDataResponse<Screenshot>>(`/games/${gameId}/screenshots`);
export {GetGameDetailService, GetGameMoviesService, GetGameScreenshotsService};
export default new APIClient<FetchDataResponse<Game>>("/games");