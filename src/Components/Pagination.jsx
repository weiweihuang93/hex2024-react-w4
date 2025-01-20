function Pagination ({
  getProduct,
  pagination
}) {

  const handlePageChange = (page) => {
    getProduct(page);
  }

  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a 
              onClick={() => handlePageChange(pagination.current_page - 1)}
              className={`page-link ${pagination.has_pre ? '' : 'disabled'}`} 
              href="#">
              上一頁
            </a>
          </li>
          {Array.from({ length: pagination.total_pages }).map((_, index) => (
            <li key={index} className="page-item" >
              <a 
                onClick={() => handlePageChange(index + 1)}
                className={`page-link ${pagination.current_page === index + 1 ? 'active' : ''}`} 
                href="#" >
                {index + 1}
              </a>
            </li>
          ))}

          <li className="page-item" >
            <a
              onClick={() => handlePageChange(pagination.current_page + 1)}
              className={`page-link ${pagination.has_next ? '' : 'disabled'}`}
              href="#">
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export default Pagination;