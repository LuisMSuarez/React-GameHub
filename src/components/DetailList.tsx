import { Heading, List } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  heading: string;
  items: ReactNode[];
}

const DetailList = ({ heading, items }: Props) => {
  console.log(items);
  return (
    <>
      <Heading size="sm" color="gray.500">
        {heading}
      </Heading>
      <List.Root variant="plain">
        {items.map((item) => (
          <List.Item>{item}</List.Item>
        ))}
      </List.Root>
    </>
  );
};

export default DetailList;
