import { Game } from "@/entities/Game";
import { Sentiment } from "@/entities/Sentiment";
import { UserGameService } from "@/services/userGameService";
import { useFeedbackStore } from "@/store/feedbackStore";
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

  const state = useMemo(() => {
    return feedback[game.id]?.sentiment ?? Sentiment.Neutral;
  }, [feedback, game.id]);

  const toggleSentiment = async (target: Sentiment) => {
    const sentiment = state === target ? Sentiment.Neutral : target;
    const updatedFeedback = {
      ...feedback[game.id],
      game,
      sentiment,
    };

    // if authenticated, update in backend api
    if (accounts.length > 0 && updatedFeedback.id) {
      const service = new UserGameService(instance, accounts[0]);
      await service.updateUserGame({
        background_image: updatedFeedback.game.background_image,
        gameId: updatedFeedback.game.id,
        id: updatedFeedback.id,
        name: updatedFeedback.game.name,
        preferences: sentiment,
        slug: updatedFeedback.game.slug,
        userId: accounts[0].localAccountId,
      });
    }

    // update local store
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
