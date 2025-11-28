import { create } from "zustand";
import { parseSentiments, Sentiment } from "../entities/Sentiment";
import { Game } from "../entities/Game";
import { GetAllUserGameService } from "../services/gamesService";
import { UserGame } from "../entities/UserGame";
import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import { loginRequest } from "../auth/authConfig";

interface GameFeedback {
  game: Game;
  sentiment: Sentiment;
}

interface FeedbackStore {
  feedback: Record<number, GameFeedback>;
  setFeedback: (gameId: number, data: GameFeedback) => void;
  removeFeedback: (gameId: number) => void;
  loadFeedback: (
    msalInstance: IPublicClientApplication,
    account: AccountInfo
  ) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedback: {},
  setFeedback: (gameId, data) =>
    set((state) => ({
      feedback: {
        ...state.feedback,
        [gameId]: data,
      },
    })),
  removeFeedback: (gameId) =>
    set((state) => {
      const { [gameId]: _, ...rest } = state.feedback;
      return { feedback: rest };
    }),
  loadFeedback: async (msalInstance, account) => {
    try {
      // Acquire token silently
      const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account,
      });

      const token = response.accessToken;
      const data = await GetAllUserGameService.get(
        {},
        { Authorization: `Bearer ${token}` }
      );

      const feedbackMap: Record<number, GameFeedback> = {};
      data.results.forEach((item: UserGame) => {
        // Create a stub of the Game with sufficient details to display in the
        // Game discovery page
        // Game detail page will fetch full details based on the id.
        const game: Game = {
          id: item.gameId,
          slug: item.slug,
          name: item.name,
          background_image: item.background_image,
          rating: 0,
          parent_platforms: [],
          metacritic: null,
          rating_top: 0,
          description_raw: "",
          genres: [],
          publishers: [],
        };
        const sentiments = parseSentiments(item.preferences);
        feedbackMap[game.id] = {
          game,
          sentiment: sentiments.includes(Sentiment.Like)
            ? Sentiment.Like
            : sentiments.includes(Sentiment.Dislike)
            ? Sentiment.Dislike
            : Sentiment.Neutral,
        };
      });
      set({ feedback: feedbackMap });
    } catch (err) {
      console.error("Failed to initialize feedback:", err);
      set({ feedback: {} });
    }
  },
}));
