import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../lib/axios";

const url = `/api/categories/create`;

const AddCategory = ({ setCategories }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { name });
      setCategories((categories) => [...categories, response.data]);
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
              onChange={(e) => setName(e.target.value)}
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
