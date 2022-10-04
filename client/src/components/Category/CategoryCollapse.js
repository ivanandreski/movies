import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";

import CategoryData from "../Category/CategoryData";

import axios from "../../lib/axios";

const CategoryCollapse = ({ category, setCategories }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/categories/${category.id}/delete`
      );
      setCategories((categories) => {
        return categories.filter(
          (c) => c.id !== response.data.data.category.id
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderDelete = () => {
    if (category.name !== "Uncategorized") {
      return (
        <button className="btn btn-danger w-100" onClick={handleDelete}>
          Delete
        </button>
      );
    }
  };

  return (
    <>
      <div
        className={`card p-4 mb-2 hoverable-pointer`}
        onClick={() => setOpen(!open)}
      >
        <div className="row">
          <div className="col-md-10">{category?.name}</div>
          <div className="col-md-2">{renderDelete()}</div>
        </div>
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
