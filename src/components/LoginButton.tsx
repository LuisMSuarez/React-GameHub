import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";
import { Button } from "@chakra-ui/react";
import { MdLogin } from "react-icons/md";

export const LoginButton: React.FC = () => {
  const { instance, accounts } = useMsal();

  if (import.meta.env.VITE_FEATURE_AUTH !== "enabled") return null;

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
      <Button
        variant="plain"
        size="md"
        borderRadius="full"
        padding={1}
        onClick={handleLogin}
      >
        <MdLogin />
      </Button>
    );
  }
};
