import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";
import { Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { MdLogin } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip";

export const LoginButton: React.FC = () => {
  const { instance, accounts } = useMsal();

  if (import.meta.env.VITE_FEATURE_AUTH !== "enabled") return null;

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      console.log("Logged in:", response.account);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (accounts.length === 0) {
    return (
      <Button
        variant="plain"
        size="md"
        borderRadius="full"
        onClick={handleLogin}
      >
        <MdLogin />
      </Button>
    );
  } else {
    return (
      <Avatar.Root>
        <Tooltip content={accounts[0].name}>
          <Avatar.Fallback name={accounts[0].name} />
        </Tooltip>
      </Avatar.Root>
    );
  }
};
