const Pagination = (total, pageSize, handlePage, page) => ({
  total: total,
  pageSize,
  onChange: (page) => {
    handlePage({page, per_page: 2})
  },
  current: page
});

export default Pagination;