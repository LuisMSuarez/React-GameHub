import NavBar from "@/components/NavBar";
import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <Box margin={5}>
        <Heading>Oops...</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "Page doesn't exist."
            : "Unexpected error."}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
