import { Platform } from "@/entities/Platform";
import { Genre } from "./Genre";
import { Publisher } from "./Publisher";

export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  rating: number;
  parent_platforms: { platform: Platform; }[];
  metacritic: number | null;
  rating_top: number; // 1, 2, 3, 4, or 5
  description_raw: string;
  genres: Genre[];
  publishers: Publisher[];
}
