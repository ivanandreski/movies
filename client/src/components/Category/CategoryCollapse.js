import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";

import CategoryData from "../Category/CategoryData";

const CategoryCollapse = ({ category }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`card p-4 mb-2 hoverable-pointer`}
        onClick={() => setOpen(!open)}
      >
        {category?.name}
      </div>
      <Collapse in={open}>
        <div className={`card p-4 mb-2`}>
          <CategoryData category={category} />
        </div>
      </Collapse>
    </>
  );
};

export default CategoryCollapse;
