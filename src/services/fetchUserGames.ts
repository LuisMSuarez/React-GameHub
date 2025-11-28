import { IPublicClientApplication, AccountInfo } from "@azure/msal-browser";
import { loginRequest } from "../auth/authConfig";
import { GetAllUserGameService } from "./gamesService";
import { UserGame } from "../entities/UserGame";

export async function fetchUserGames(
  msalInstance: IPublicClientApplication,
  account: AccountInfo
): Promise<UserGame[]> {
  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account,
  });

  const token = response.accessToken;

  const data = await GetAllUserGameService.get(
    {},
    { Authorization: `Bearer ${token}` }
  );

  return data.results as UserGame[];
}
