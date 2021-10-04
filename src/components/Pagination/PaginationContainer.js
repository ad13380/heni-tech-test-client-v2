import Pagination from "react-bootstrap/Pagination";

export default function PaginationContainer({
  currentPage,
  totalPages,
  handlePageChange,
}) {
  const getPaginationGroup = (currentPage, totalPages) => {
    if (totalPages < 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startingPageNumber;
    if (currentPage < 3) {
      startingPageNumber = 1;
    } else if (currentPage > totalPages - 2) {
      startingPageNumber = totalPages - 4;
    } else {
      startingPageNumber = currentPage - 2;
    }

    return Array.from({ length: 5 }, (_, i) => i + startingPageNumber);
  };

  return (
    <Pagination
      className="justify-content-center"
      data-test="pagination-component"
    >
      {currentPage !== 1 && (
        <Pagination.First onClick={() => handlePageChange(1)} />
      )}
      {currentPage !== 1 && (
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
      )}
      {getPaginationGroup(currentPage, totalPages).map((pageNumber) => {
        return (
          <Pagination.Item
            key={pageNumber}
            active={currentPage === pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      })}
      {currentPage !== totalPages && (
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
      )}
      {currentPage !== totalPages && (
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      )}
    </Pagination>
  );
}
