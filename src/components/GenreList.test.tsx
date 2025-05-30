import { render, screen } from "@testing-library/react";
import GenreList from "./GenreList";
import { Genre } from "@/entities/Genre";
import { describe, expect, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

// Create a QueryClient instance for testing
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries to avoid unnecessary delays in tests
      },
    },
  });

describe("GenreList", () => {
  it("should render genres", () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <GenreList />
        </Provider>
      </QueryClientProvider>
    );

    mockGenres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });
});
