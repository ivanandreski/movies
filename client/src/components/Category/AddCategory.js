import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../lib/axios";

const url = `/api/categories/create`;

const AddCategory = ({ setCategories }) => {
  const nameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    try {
      const response = await axios.post(url, { name });
      setCategories((categories) => [
        ...categories,
        response.data.data.category,
      ]);
      nameRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card p-4 mt-2 mb-2">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-9">
            <input
              type="text"
              ref={nameRef}
              placeholder="Category name"
              className="form-control w-100"
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100">Add Category</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
