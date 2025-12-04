import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";
import { Button } from "@chakra-ui/react";
import { IoLogIn } from "react-icons/io5";
import { Tooltip } from "@/components/ui/tooltip";

export const LoginButton: React.FC = () => {
  const { instance, accounts } = useMsal();

  const handleLogin = async () => {
    try {
      // const response = await instance.loginPopup(loginRequest);
      // console.log("Logged in:", response.account);
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (accounts.length === 0) {
    return (
      <Tooltip content="Log in">
        <Button
          variant="plain"
          borderRadius="full"
          size="md"
          padding={1}
          onClick={handleLogin}
        >
          <IoLogIn />
        </Button>
      </Tooltip>
    );
  }
};
