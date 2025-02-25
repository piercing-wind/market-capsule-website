import React from "react";

const Bolt = ({ width = "13.436", height = "19" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 13.436 19"
    >
      <path
        id="bolt"
        d="M10.787,19H7.741l1.583-6.333H6.053a2.027,2.027,0,0,1-1.94-2.613L7.153,0h7.495L12.273,6.333h3.185a2.005,2.005,0,0,1,1.67,3.113Z"
        transform="translate(-4.026)"
        fill="#3e63ff"
      />
    </svg>
  );
};

export default Bolt;
