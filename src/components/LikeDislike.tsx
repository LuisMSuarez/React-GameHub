import { Sentiment } from "@/entities/Sentiment";
import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const LikeDislike = () => {
  const [state, setState] = useState<Sentiment>(Sentiment.Neutral);
  if (import.meta.env.VITE_GAME_DISCOVERY !== "enabled") return null;
  return (
    <HStack justifyContent="flex-end">
      <FaHeart
        color={state === Sentiment.Like ? "red" : undefined}
        cursor="pointer"
        onClick={() =>
          setState(state == Sentiment.Like ? Sentiment.Neutral : Sentiment.Like)
        }
      />
      <FaHeartBroken
        color={state === Sentiment.Dislike ? "red" : undefined}
        cursor="pointer"
        onClick={() =>
          setState(
            state == Sentiment.Dislike ? Sentiment.Neutral : Sentiment.Dislike
          )
        }
      />
    </HStack>
  );
};

export default LikeDislike;
