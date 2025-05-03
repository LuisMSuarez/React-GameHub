import { render, screen, fireEvent } from "@testing-library/react";
import GenreList from "./GenreList";
import { Genre } from "@/hooks/useGenres";
import { describe, expect, it, vi } from "vitest";
import { Provider } from "./ui/provider";

const mockGenres: Genre[] = [
  { id: 1, name: "Action", slug: "action", image_background: "action.jpg" },
  {
    id: 2,
    name: "Adventure",
    slug: "adventure",
    image_background: "adventure.jpg",
  },
];

describe("GenreList", () => {
  it("should render genres", () => {
    render(
      <Provider>
        <GenreList selectedGenre={null} onGenreSelect={vi.fn()} />
      </Provider>
    );

    mockGenres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });

  it("should call onGenreSelect when a genre is clicked", () => {
    const onGenreSelect = vi.fn();
    render(
      <Provider>
        <GenreList selectedGenre={null} onGenreSelect={onGenreSelect} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Action"));
    expect(onGenreSelect).toHaveBeenCalled();
    // expect(onGenreSelect).toHaveBeenCalledWith(mockGenres[0]);
  });
});
