const Paginator = ({
  page,
  rowsPerPage,
  totalRecords,
  onPageChange,
}: PaginatorType) => {


  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const visiblePages = [];
  for (
    let i = Math.max(1, page - 4);
    i <= Math.min(totalPages, page + 4);
    i++
  ) {
    visiblePages.push(i);
  }
  return (
    <div className="paginator-container">
      <button   className="nav-button" disabled={page === 1} onClick={()=>onPageChange(1)}>{"<<"}</button>

      <button
      className="nav-button"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(0, page - 1))}
      >
        Previous
      </button>

      <div className="page-breadcrumb">
        {visiblePages.map((p) => (
          <button key={p} disabled={p === page} onClick={() => onPageChange(p)}>
            {p}
          </button>
        ))}
      </div>
      <button
      className="nav-button"
        disabled={page >= Math.ceil(totalRecords / rowsPerPage)}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
      <button  className="nav-button" disabled={page === totalPages} onClick={()=>onPageChange(totalPages)}>{">>"}</button>
    </div>
  );
};

export default Paginator;

interface PaginatorType {
  page: number;
  rowsPerPage: number;
  totalRecords: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}
