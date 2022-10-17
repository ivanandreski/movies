import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import axios from "../../lib/axios";
import { UserCategoriesContext } from "../../context/UserCategoriesContext";

const AddMovieToCategory = ({ movie }) => {
  const [categoryId, setCategoryId] = useState(null);
  const categories = useContext(UserCategoriesContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        if (categories?.length > 0) setCategoryId(categories[0].id);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const url = `/api/movies/create`;
      await axios.post(
        url,
        {
          title: movie.Title || movie.title,
          year: movie.Year || movie.year,
          categoryId: categoryId,
          poster: movie.Poster || movie.poster,
          imdbID: movie.imdbID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryOptions = () => {
    return categories?.map((category) => {
      return { label: category.name, value: category.id };
    });
  };

  return (
    <>
      <span
        onClick={handleShow}
        className="hoverable-pointer inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
      >
        Add to category
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add movie to category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            options={getCategoryOptions()}
            onChange={(e) => setCategoryId(e.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMovieToCategory;
