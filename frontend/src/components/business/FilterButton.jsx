import React from "react";

export const FilterButton = ({handleChange, filterBy, filterStatus}) => {
  return (
    <button
      onClick={handleChange}
      className={`${
        filterStatus === filterBy ? "bg-blue-500 text-white" : "bg-gray-200"
      } px-4 py-2 rounded-md`}
    >
      {filterBy}
    </button>
  );
};
