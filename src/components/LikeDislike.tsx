import { Game } from "@/entities/Game";
import { Sentiment } from "@/entities/Sentiment";
import { useFeedbackStore } from "@/store/feedbackStore";
import { HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

interface Props {
  game: Game;
}

const LikeDislike = ({ game }: Props) => {
  const setFeedback = useFeedbackStore((s) => s.setFeedback);
  const feedback = useFeedbackStore((s) => s.feedback);

  const state = useMemo(() => {
    return feedback[game.id]?.sentiment ?? Sentiment.Neutral;
  }, [feedback, game.id]);

  const toggleSentiment = (target: Sentiment) => {
    setFeedback(game.id, {
      ...feedback[game.id],
      game,
      sentiment: state === target ? Sentiment.Neutral : target,
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
