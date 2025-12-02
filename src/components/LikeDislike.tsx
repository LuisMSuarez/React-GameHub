import { Game } from "@/entities/Game";
import { Sentiment } from "@/entities/Sentiment";
import { UserGame } from "@/entities/UserGame";
import { UserGameService } from "@/services/userGameService";
import { GameFeedback, useFeedbackStore } from "@/store/feedbackStore";
import { useMsal } from "@azure/msal-react";
import { HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

interface Props {
  game: Game;
}

const LikeDislike = ({ game }: Props) => {
  const setFeedback = useFeedbackStore((s) => s.setFeedback);
  const removeFeedback = useFeedbackStore((s) => s.removeFeedback);
  const feedback = useFeedbackStore((s) => s.feedback);
  const { accounts, instance } = useMsal();

  const state = useMemo(
    () => feedback[game.id]?.sentiment ?? Sentiment.Neutral,
    [feedback, game.id]
  );

  const persistFeedback = async (
    updatedFeedback: GameFeedback,
    sentiment: Sentiment
  ) => {
    if (accounts.length === 0) return;

    const account = accounts[0];
    const service = new UserGameService(instance, account);

    const payload: UserGame = {
      id: updatedFeedback.id ?? null,
      background_image: updatedFeedback.game.background_image,
      gameId: updatedFeedback.game.id,
      name: updatedFeedback.game.name,
      preferences: sentiment,
      slug: updatedFeedback.game.slug,
      userId: account.localAccountId,
    };

    if (updatedFeedback.id) {
      return service.updateUserGame(payload);
    } else {
      const created = await service.createUserGame(payload);
      updatedFeedback.id = created.id;
      return created;
    }
  };

  const toggleSentiment = (target: Sentiment) => {
    const sentiment = state === target ? Sentiment.Neutral : target;

    const previousFeedback = feedback[game.id]; // snapshot for rollback
    const updatedFeedback: GameFeedback = {
      ...previousFeedback,
      game,
      sentiment,
    };

    // update local store immediately
    setFeedback(game.id, updatedFeedback);

    // persist asynchronously
    persistFeedback(updatedFeedback, sentiment).catch((error) => {
      console.error("Failed to persist feedback:", error);

      // rollback to previous state if backend update fails
      if (previousFeedback !== undefined) {
        // previous feedback existed: roll back
        setFeedback(game.id, previousFeedback);
      } else {
        // previous feedback did not exist: remove feedback that
        // failed the backend update
        removeFeedback(game.id);
      }
    });
  };

  return (
    <HStack>
      <FaHeart
        color={state === Sentiment.Like ? "red" : undefined}
        cursor="pointer"
        onClick={() => toggleSentiment(Sentiment.Like)}
      />
      <FaHeartBroken
        color={state === Sentiment.Dislike ? "red" : undefined}
        cursor="pointer"
        onClick={() => toggleSentiment(Sentiment.Dislike)}
      />
    </HStack>
  );
};

export default LikeDislike;
