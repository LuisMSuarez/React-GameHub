import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
      const [games, setGames] = useState<Game[]>([]);
      const [error, setError] = useState("");
      
      useEffect(() => {
        apiClient
          .get<FetchGamesResponse>("/games")
          .then((res) => setGames(res.data.results))
          .catch((err) => setError(err.message));
      }, []);

      return { games, error};
}

export default useGames;