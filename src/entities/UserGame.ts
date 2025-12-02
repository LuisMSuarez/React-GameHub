export interface UserGame {
  id: string | null;
  gameId: number;
  slug: string;
  name: string;
  background_image: string;
  userId: string;
  preferences: string;
}
