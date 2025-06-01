import APIClient, { FetchDataResponse } from "./api-client";
import { Game } from "../entities/Game";
import { Movie } from "@/entities/Movie";

const GetGameDetailService = (id: string) => new APIClient<Game>(`/games/${id}`);
const GetGameMoviesService = (id: string) => new APIClient<FetchDataResponse<Movie>>(`/games/${id}/movies`);
export {GetGameDetailService, GetGameMoviesService};
export default new APIClient<FetchDataResponse<Game>>("/games");