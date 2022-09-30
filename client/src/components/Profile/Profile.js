import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../../lib/axios";
import AddCategory from "components/Category/AddCategory";
import AppLayout from "components/Layouts/AppLayout";
import React from "react";
import CategoryCollapse from "../Category/CategoryCollapse";

const Profile = () => {
  const { username } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/users/${username}/categories`);
        setCategories(response.data.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [username]);

  const renderCategories = () => {
    return categories?.map((category, key) => (
      <CategoryCollapse key={key} category={category} />
    ));
  };

  return (
    <AppLayout>
      <div className="mt-5 container">
        <AddCategory setCategories={setCategories} />
        {renderCategories()}
      </div>
    </AppLayout>
  );
};

export default Profile;
