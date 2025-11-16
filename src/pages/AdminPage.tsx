import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";

export const AdminPage: React.FC = () => {
  const { instance, accounts } = useMsal();

  const callApi = async () => {
    if (accounts.length === 0) {
      console.error("No accounts logged in");
      return;
    }

    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      const token = response.accessToken;

      const res = await fetch(
        "https://gamers-hub-api.azurewebsites.net/v1/Admin/test",
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

  return <button onClick={callApi}>Call Admin API</button>;
};
