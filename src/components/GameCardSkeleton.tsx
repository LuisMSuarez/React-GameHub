import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card.Root width="300px" borderRadius={10} overflow="hidden">
      <Skeleton height="200px" />
      <Card.Body>
        <SkeletonText noOfLines={2} gap="4" />
      </Card.Body>
    </Card.Root>
  );
};

export default GameCardSkeleton;
