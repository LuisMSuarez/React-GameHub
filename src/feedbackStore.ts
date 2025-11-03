import { create } from "zustand";
import { Sentiment } from "./entities/Sentiment";
import { Game } from "./entities/Game";

interface GameFeedback {
  game: Game;
  sentiment: Sentiment;
}

interface FeedbackStore {
  feedback: Record<number, GameFeedback>;
  setFeedback: (gameId: number, data: GameFeedback) => void;
  removeFeedback: (gameId: number) => void;
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
}));
