import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority:
      "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
    redirectUri: window.location.origin,
  },
};

export const loginRequest: PopupRequest = {
  scopes: [`api://${import.meta.env.VITE_CLIENT_ID}/access_as_user`],
};
