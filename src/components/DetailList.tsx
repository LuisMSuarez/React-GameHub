import { Heading, List } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  heading: string;
  children: ReactNode[];
}

const DetailList = ({ heading, children }: Props) => {
  return (
    <>
      <Heading size="md" as="dt" color="gray.500">
        {heading}
      </Heading>
      <List.Root variant="plain" as="dd">
        {children}
      </List.Root>
    </>
  );
};

export default DetailList;
