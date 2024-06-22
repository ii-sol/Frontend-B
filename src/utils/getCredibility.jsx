export const getCredibility = (score) => {
  if (score >= 0 && score <= 20) {
    return "매우 낮음";
  } else if (score > 20 && score <= 40) {
    return "낮음";
  } else if (score > 40 && score <= 60) {
    return "보통";
  } else if (score > 60 && score <= 80) {
    return "높음";
  } else if (score > 80 && score <= 100) {
    return "매우 높음";
  } else {
    return "정보 없음";
  }
};
