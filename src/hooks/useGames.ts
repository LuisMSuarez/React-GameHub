import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface Platforms {
    id: number;
    name: string;
    slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  parent_platforms: { platform: Platforms} []
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
      const [games, setGames] = useState<Game[]>([]);
      const [error, setError] = useState("");

      useEffect(() => {
        const controller = new AbortController();

        apiClient
          .get<FetchGamesResponse>("/games", { signal: controller.signal})
          .then((res) => setGames(res.data.results))
          .catch((err) => { 
            if (err instanceof CanceledError) 
            {
                // don't display error in case we cancel a request calling controller.abort
                return;
            }
            setError(err.message) 
        });
        
        // cleanup function to be called when unmounting the component.
        // strict mode causes double-render quickly, instead of forcing two network calls
        // we simply raise the abort signal.  in the case of the first request that is part of the first render, it will effectively abort it
        // in the case of the second request, it won't cause any issues, as abort will be caused way after the call has been
        // issued and data return, so no harm is caused
        return () => controller.abort();
      }, []);

      return { games, error};
}

export default useGames;