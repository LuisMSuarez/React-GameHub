import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "739fc281-af8d-42f7-ac40-9cb0601ec826", // Azure App Registration
    authority:
      "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
    redirectUri: "http://localhost:5173", // Vite dev server
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["email", "profile"],
};
