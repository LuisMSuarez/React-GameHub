import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

enum LikeState {
  Empty,
  Like,
  Dislike,
}

const LikeDislike = () => {
  const [state, setState] = useState<LikeState>(LikeState.Empty);

  return (
    <HStack justifyContent="flex-end">
      <FaHeart
        color={state === LikeState.Like ? "red" : undefined}
        cursor="pointer"
        onClick={() =>
          setState(state == LikeState.Like ? LikeState.Empty : LikeState.Like)
        }
      />
      <FaHeartBroken
        color={state === LikeState.Dislike ? "red" : undefined}
        cursor="pointer"
        onClick={() =>
          setState(
            state == LikeState.Dislike ? LikeState.Empty : LikeState.Dislike
          )
        }
      />
    </HStack>
  );
};

export default LikeDislike;
