export const groupDataByDate = (data) => {
  return data.reduce((acc, item) => {
    let date;
    if (item.createDate) {
      const [year, month, day] = item.createDate.slice(0, 3);
      date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`;
    } else {
      date = item.createdDate.split("T")[0];
    }

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};
