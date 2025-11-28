import { Genre } from "../entities/Genre";
import { Platform } from "../entities/Platform";
import { create } from "zustand";

interface GameQuery {
  genre: Genre | null;
  ordering: string;
  search: string;
  platforms: Platform[];
  pageSize: number;
  language?: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenre: (genre: Genre | null) => void;
  setOrdering: (ordering: string) => void;
  setSearch: (search: string) => void;
  setPlatforms: (platforms: Platform[]) => void;
  setPageSize: (pageSize: number) => void;
  setLanguage: (language: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {
    genre: null,
    ordering: "",
    search: "",
    platforms: [],
    pageSize: 20,
    language: undefined,
  },
  setGenre: (genre: Genre | null) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, genre: genre } })),
  setOrdering: (ordering: string) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, ordering: ordering } })),
  setSearch: (search: string) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, search: search } })),
  setPlatforms: (platforms: Platform[]) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, platforms: platforms },
    })),
  setPageSize: (pageSize: number) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, pageSize: pageSize } })),
  setLanguage: (language: string) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, language: language } })),
}));

export default useGameQueryStore;
