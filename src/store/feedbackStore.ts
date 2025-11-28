import { create } from "zustand";
import { parseSentiment, Sentiment } from "../entities/Sentiment";
import { Game } from "../entities/Game";
import { UserGame } from "../entities/UserGame";

interface GameFeedback {
  game: Game;
  sentiment: Sentiment;
}

interface FeedbackStore {
  feedback: Record<number, GameFeedback>;
  setFeedback: (gameId: number, data: GameFeedback) => void;
  removeFeedback: (gameId: number) => void;
  loadFeedback: (items: UserGame[]) => void;
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
  loadFeedback: (items: UserGame[]) => {
    const feedbackMap: Record<number, GameFeedback> = {};
    items.forEach((item) => {
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
      feedbackMap[game.id] = {
        game,
        sentiment: parseSentiment(item.preferences),
      };
    });
    set({ feedback: feedbackMap });
  },
}));
