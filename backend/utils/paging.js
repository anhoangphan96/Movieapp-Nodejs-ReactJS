const pagingHandler = (movieList, page) => {
  //Mỗi page sẽ gồm 20 kết quả
  const resultList = movieList.slice(20 * (page - 1), 20 * page);
  //Tính toán toal page
  const total_pages = Math.ceil((movieList.length + 1) / 20);
  //Nếu như page request lớn hơn totalpage thì sẽ báo lỗi, còn không sẽ trả kết quả theo format
  if (page > total_pages) {
    return {
      message: `You request page is exceeding, please change page param and search again (the total pages of this keyword is ${total_pages}) `,
    };
  }
  return {
    results: resultList,
    page: Number(page),
    total_pages: total_pages,
  };
};

module.exports = pagingHandler;
