import { HStack } from "@chakra-ui/react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const LikeDislike = () => {
  return (
    <HStack justifyContent="flex-end" color="red">
      <FaHeart />
      <FaHeartBroken />
    </HStack>
  );
};

export default LikeDislike;
