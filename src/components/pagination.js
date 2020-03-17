const pagination = (
  totalCount,
  pageSize,
  handlePage,
  currentPage,
  dispatch,
) => ({
  total: totalCount,
  pageSize,
  onChange: (page) => {
    dispatch(handlePage({ page }))
  },
  current: currentPage,
});

export default pagination;
