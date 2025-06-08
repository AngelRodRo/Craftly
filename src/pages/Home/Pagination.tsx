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
  return (
    <Pagination data-testid="pagination" className="flex justify-center">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem data-testid="pagination-previous">
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index} data-testid="pagination-item">
            <PaginationLink
              isActive={currentPage === index + 1}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem data-testid="pagination-next">
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
