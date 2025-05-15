import { Game } from "@/services/gamesService";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GameCard from "./GameCard";
import { Provider } from "./ui/provider";

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
