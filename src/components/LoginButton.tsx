import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";
import { Button } from "@chakra-ui/react";

export const LoginButton: React.FC = () => {
  const { instance } = useMsal();

  if (import.meta.env.VITE_FEATURE_AUTH !== "enabled") return null;

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      console.log("Logged in:", response.account);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <Button onClick={handleLogin}>Login</Button>;
};
