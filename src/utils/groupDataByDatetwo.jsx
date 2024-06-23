export const groupDataByDatetwo = (data) => {
  const groupedData = data.reduce((acc, item) => {
    // createDate를 한국 시간으로 변환
    const createDate = new Date(item.createDate + 9 * 60 * 60 * 1000);
    const year = createDate.getUTCFullYear();
    const month = String(createDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(createDate.getUTCDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // 날짜별로 데이터를 최신순으로 정렬
  for (const date in groupedData) {
    groupedData[date].sort(
      (a, b) => new Date(b.createDate) - new Date(a.createDate)
    );
  }

  return groupedData;
};
