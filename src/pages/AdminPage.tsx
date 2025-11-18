import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";
import { Button } from "@chakra-ui/react";

export const AdminPage: React.FC = () => {
  const { instance, accounts } = useMsal();

  if (import.meta.env.VITE_FEATURE_AUTH !== "dev") return null;

  const callApi = async () => {
    if (accounts.length === 0) {
      console.error("No accounts logged in");
      return;
    }

    try {
      // Runs silently in the background.
      // It checks for valid token in the cache, and if needed,
      // uses a hidden iframe to refresh tokens.
      // It never navigates the browser to your redirect URI
      // Other behaviors are loginPopup and loginRedirect
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      const token = response.accessToken;

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Admin/test`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("Admin API response:", data);
    } catch (error) {
      console.error("Token acquisition or API call failed:", error);
    }
  };

  return <Button onClick={callApi}>Call Admin API</Button>;
};
