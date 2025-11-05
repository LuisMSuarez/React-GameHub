import APIClient, { FetchDataResponse } from "./api-client";
import { Game } from "../entities/Game";
import { Movie } from "@/entities/Movie";
import { Screenshot } from "@/entities/Screenshot";
import { RecommendationsRequest } from "@/entities/RecommendationsRequest";

const GetGameDetailService = (gameId: string) =>
  new APIClient<any, Game>(`/games/${gameId}`);
const GetGameMoviesService = (gameId: string) =>
  new APIClient<any, FetchDataResponse<Movie>>(`/games/${gameId}/movies`);
const GetGameScreenshotsService = (gameId: string) =>
  new APIClient<any, FetchDataResponse<Screenshot>>(
    `/games/${gameId}/screenshots`
  );
const GetGameRecommendationService = new APIClient<
  RecommendationsRequest,
  FetchDataResponse<Game>
>(`/games/recommendations`);

export {
  GetGameDetailService,
  GetGameMoviesService,
  GetGameScreenshotsService,
  GetGameRecommendationService,
};
export default new APIClient<any, FetchDataResponse<Game>>("/games");
