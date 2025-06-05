import { useAppSelector } from "@/app/hook";
import type { RootState } from "@/app/store";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";

export default function PaginationComponent() {
  const filter = useAppSelector((state: RootState) => state.services.filter);
  const totalPages = useAppSelector(
    (state: RootState) => state.services.totalPages
  );

  return (
    <Pagination className="flex justify-center">
      <PaginationContent>
        {filter.page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${filter.page - 1}`} />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={filter.page === index + 1}
              href={`?page=${index + 1}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {filter.page < totalPages && (
          <PaginationItem>
            <PaginationNext href={`?page=${filter.page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
