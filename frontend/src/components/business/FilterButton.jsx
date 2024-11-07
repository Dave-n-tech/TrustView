import React from "react";

export const FilterButton = ({handleChange, filterBy, filterStatus, active}) => {
  return (
    <button
      onClick={handleChange}
      className={`${
        filterStatus === filterBy && active ? "bg-blue-500 text-white" : "bg-gray-200"
      } px-4 py-2 rounded-md`}
    >
      {filterBy}
    </button>
  );
};
