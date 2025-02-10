import React from "react";

export const CaretDownRed = ({fill="#ff4f55",transform="false"}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7.434"
      height="4.282"
      viewBox="0 0 7.434 4.282"
      transform={transform ==="true" && "rotate(180)"}
    >
      <path
        id="caret-down_1_"
        data-name="caret-down (1)"
        d="M5.976,9h6.31a.564.564,0,0,1,.4.965L9.532,13.115a.564.564,0,0,1-.8,0L5.581,9.965A.564.564,0,0,1,5.976,9Z"
        transform="translate(-5.414 -9)"
        fill={fill}
      />
    </svg>
  );
};
