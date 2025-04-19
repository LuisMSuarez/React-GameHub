import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card.Root borderRadius={10}>
      <Skeleton height="200px" />
      <Card.Body>
        <SkeletonText noOfLines={2} gap="4" />
      </Card.Body>
    </Card.Root>
  );
};

export default GameCardSkeleton;
