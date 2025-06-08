import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationComponentProps) {
  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <Pagination data-testid="pagination" className="flex justify-center">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem data-testid="pagination-previous">
            <PaginationPrevious
              href="#"
              onClick={(e) => handlePageChange(e, currentPage - 1)}
            />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index} data-testid="pagination-item">
            <PaginationLink
              href="#"
              isActive={currentPage === index + 1}
              onClick={(e) => handlePageChange(e, index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem data-testid="pagination-next">
            <PaginationNext
              href="#"
              onClick={(e) => handlePageChange(e, currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
