const onTouchMove = (e, ref, startX) => {
  const touch = e.touches[0];
  const moveX = touch.clientX;

  if (startX - moveX > 30) {
    ref.current.style.transform = "translateX(-55px)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transform = "translateX(0px)";
    }, 2000);
  } else {
    ref.current.style.transform = "translateX(0px)";
  }
};

export const onTouchStart = (e, ref, setStartX) => {
  const touch = e.touches[0];
  const startX = touch.clientX;
  setStartX(startX);

  const moveHandler = (event) => onTouchMove(event, ref, startX);

  ref.current.addEventListener("touchmove", moveHandler, { passive: true });

  ref.current.addEventListener(
    "touchend",
    function endHandler() {
      ref.current.removeEventListener("touchmove", moveHandler);
      ref.current.removeEventListener("touchend", endHandler);
    },
    { once: true }
  );
};

export const onTouchEnd = (ref, moveHandler, endHandler) => {
  ref.current.removeEventListener("touchmove", moveHandler);
  ref.current.removeEventListener("touchend", endHandler);
};
