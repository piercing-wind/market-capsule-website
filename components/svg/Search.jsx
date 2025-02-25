import React from "react";

const Search = ({ width = "24.032", height = "24.032" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24.032 24.032"
    >
      <path
        id="search"
        d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,1,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8,8,8,0,0,1-8,8Z"
        transform="translate(0.032 0.032)"
        fill="#919191"
      />
    </svg>
  );
};

export default Search;
