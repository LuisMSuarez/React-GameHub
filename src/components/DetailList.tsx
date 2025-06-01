import { Heading, List } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  heading: string;
  children: ReactNode[];
}

const DetailList = ({ heading, children }: Props) => {
  return (
    <>
      <Heading size="sm" color="gray.500">
        {heading}
      </Heading>
      <List.Root variant="plain">
        {children.map((children, index) => (
          <List.Item key={index}>{children}</List.Item>
        ))}
      </List.Root>
    </>
  );
};

export default DetailList;
