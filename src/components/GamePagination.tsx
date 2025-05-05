import { GameQuery } from "@/App";
import {
  ButtonGroup,
  IconButton,
  Pagination,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface Props {
  gameQuery: GameQuery;
  gameCount: number;
  onPageChange: (page: number) => void;
}

const GamePagination = ({ gameQuery, gameCount, onPageChange }: Props) => {
  if (gameCount <= 0) {
    return null;
  }

  /* The default breakpoints are:
     base – applies to all screen sizes by default.
     sm – 30em (480px).
     md – 48em (768px).
     lg – 62em (992px).
     xl – 80em (1280px).
     2xl – 96em (1536px).
  */
  const siblingCount = useBreakpointValue({ base: 0, md: 3, lg: 4, xl: 5 });

  return (
    <Pagination.Root
      count={gameCount}
      pageSize={gameQuery.pageSize}
      page={gameQuery.pageNumber}
      siblingCount={siblingCount}
      onPageChange={(e) => onPageChange(e.page)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "solid" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default GamePagination;
