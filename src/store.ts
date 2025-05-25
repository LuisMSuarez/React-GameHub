import { Genre } from "@/hooks/useGenres";
import { Platform } from "@/hooks/usePlatforms";
import { create } from "zustand";

export interface GameQuery {
  genre: Genre | null;
  ordering: string;
  search: string;
  platforms: Platform[];
  pageSize: number;
}

interface GameQueryStore {
    gameQuery: GameQuery;
    setGenre: (genre: Genre) => void;
    setOrdering: (ordering: string) => void;
    setSearch: (search: string) => void;
    setPlatforms: (platforms: Platform[]) => void;
    setPageSize: (pageSize: number) => void;
}

const useGameQueryStore = create<GameQueryStore>( set => ({
    gameQuery: {
        genre: null,
        ordering: "",
        search: "",
        platforms: [],
        pageSize: 20
    },
    setGenre: (genre: Genre) => set(state => ({ gameQuery: { ...state.gameQuery, genre: genre }})),
    setOrdering: (ordering: string) => set(state => ({ gameQuery: { ...state.gameQuery, ordering: ordering }})),
    setSearch: (search: string) => set(state => ({ gameQuery: { ...state.gameQuery, search: search }})),
    setPlatforms: (platforms: Platform[]) => set(state => ({ gameQuery: { ...state.gameQuery, platforms: platforms }})),
    setPageSize: (pageSize: number) => set(state => ({ gameQuery: { ...state.gameQuery, pageSize: pageSize }}))
}));

export default useGameQueryStore;