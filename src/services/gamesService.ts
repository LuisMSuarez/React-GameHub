import APIClient, { FetchDataResponse } from "./api-client";
import { Game } from "../entities/Game";
import { Movie } from "@/entities/Movie";

const GetGameDetailService = (gameId: string) => new APIClient<Game>(`/games/${gameId}`);
const GetGameMoviesService = (gameId: string) => new APIClient<FetchDataResponse<Movie>>(`/games/${gameId}/movies`);
export {GetGameDetailService, GetGameMoviesService};
export default new APIClient<FetchDataResponse<Game>>("/games");