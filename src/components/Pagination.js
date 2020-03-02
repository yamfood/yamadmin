const Pagination = (total, pageSize, handlePage, currentPage) => ({
  total: total,
  pageSize,
  onChange: (page) => {
    handlePage({ page })
  },
  current: currentPage,
});

export default Pagination;
