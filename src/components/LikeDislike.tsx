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
      await service.updateUserGame(payload);
    } else {
      const created = await service.createUserGame(payload);
      updatedFeedback.id = created.id;
    }
  };

  const toggleSentiment = async (target: Sentiment) => {
    const sentiment = state === target ? Sentiment.Neutral : target;
    const updatedFeedback: GameFeedback = {
      ...feedback[game.id],
      game,
      sentiment,
    };

    await persistFeedback(updatedFeedback, sentiment);

    setFeedback(game.id, updatedFeedback);
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
