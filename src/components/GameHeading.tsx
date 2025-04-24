import { Heading } from "@chakra-ui/react";

interface Props {
  attributes: string[];
}
const GameHeading = ({ attributes }: Props) => {
  return <Heading size="3xl">{attributes.join(",")} Games</Heading>;
};

export default GameHeading;
