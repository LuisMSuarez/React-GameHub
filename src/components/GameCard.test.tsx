import { render, screen } from "@testing-library/react";
import GameCard from "./GameCard";
import { Game } from "@/hooks/useGames";
import { Provider } from "./ui/provider";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));

const mockGame: Game = {
  id: 1,
  name: "Test Game",
  background_image: "test-image.jpg",
  rating: 4,
  parent_platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }],
  metacritic: 85,
  rating_top: 5,
};

describe("GameCard", () => {
  it("should render game details", () => {
    render(
      <Provider>
        <GameCard game={mockGame} />
      </Provider>
    );

    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByAltText("Exceptional")).toBeInTheDocument();
    expect(screen.getByText("85")).toBeInTheDocument();
  });
});
