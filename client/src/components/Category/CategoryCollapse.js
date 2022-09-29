import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";

import CategoryData from "../Category/CategoryData";

const CategoryCollapse = ({ category }) => {
  const [open, setOpen] = useState(false);

  const getClass = () => {
    return "";

    if (open) {
      return "bg-secondary text-light";
    }
    return "";
  };

  return (
    <>
      <div
        className={`card p-4 mb-2 ${getClass()}`}
        onClick={() => setOpen(!open)}
      >
        {category?.name}
      </div>
      <Collapse in={open}>
        <div className={`card p-4 mb-2 ${getClass()}`}>
          <CategoryData category={category} />
        </div>
      </Collapse>
    </>
  );
};

export default CategoryCollapse;
