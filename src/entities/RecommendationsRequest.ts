import { Game } from "./Game";

export interface RecommendationsRequest {
  likedGames: Game[];
  dislikedGames: Game[];
}
