

//import "./paginacion.css";

const Paginacion = (props) => {
  const { nPage, currentPage, setCurrentePage } = props;

  const next = () => {
    if (currentPage !== nPage) setCurrentePage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage !== 1) setCurrentePage(currentPage - 1);
  };

  return (
    <div className="paginacion flex items-center gap-2">
      <button onClick={prev} disabled={currentPage === 1} className="px-3 py-1 rounded border hover:bg-muted cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        Prev
      </button>
      <span className="px-2">
        {currentPage} / {nPage}
      </span>
      <button onClick={next} disabled={currentPage === nPage} className="px-3 py-1 rounded border hover:bg-muted cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Paginacion;
