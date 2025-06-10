import { useState } from "react";
import { Button, Text } from "@chakra-ui/react";

interface Props {
  text: string;
}

const ExpandableText = ({ text }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const charLimit = 300;

  if (!text) {
    return null;
  }

  if (text.length <= charLimit) {
    return <Text>{text}</Text>;
  }

  return (
    <Text>
      {expanded ? text : text.substring(0, charLimit) + "..."}
      <Button size="2xs" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Less" : "More"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
