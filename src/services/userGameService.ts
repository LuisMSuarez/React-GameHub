import { IPublicClientApplication, AccountInfo } from "@azure/msal-browser";
import { loginRequest } from "../auth/authConfig";
import {
  GetAllUserGameService,
  GetCreateUserGameService,
  GetUserGameService,
} from "./gamesService";
import { UserGame } from "../entities/UserGame";

export class UserGameService {
  private msalInstance: IPublicClientApplication;
  private account: AccountInfo;

  constructor(msalInstance: IPublicClientApplication, account: AccountInfo) {
    this.msalInstance = msalInstance;
    this.account = account;
  }

  private async getAccessToken(): Promise<string> {
    const response = await this.msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: this.account,
    });
    return response.accessToken;
  }

  public async fetchUserGames(): Promise<UserGame[]> {
    const token = await this.getAccessToken();
    const data = await GetAllUserGameService.get(
      {},
      { Authorization: `Bearer ${token}` }
    );

    return data.results as UserGame[];
  }

  public async createUserGame(userGame: UserGame): Promise<UserGame> {
    const token = await this.getAccessToken();
    const data = await GetCreateUserGameService.post(userGame, {
      Authorization: `Bearer ${token}`,
    });

    return data as UserGame;
  }

  public async updateUserGame(userGame: UserGame): Promise<UserGame> {
    const token = await this.getAccessToken();
    const data = await GetUserGameService(userGame.id!).put(userGame, {
      Authorization: `Bearer ${token}`,
    });

    return data as UserGame;
  }
}
