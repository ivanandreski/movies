import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import axios from "../../lib/axios";
import { useAuth } from "hooks/auth";

const AddMovieToCategory = ({ movie }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { user } = useAuth({ middleware: "auth" });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`/api/users/${user?.name}/categories`);
        const categories = response.data.data.categories;
        setCategoryOptions(
          categories?.map((category) => {
            return { label: category.name, value: category.id };
          })
        );
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
          title: movie.Title,
          year: movie.Year,
          categoryId: categoryId,
          poster: movie.Poster,
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

  return (
    <>
      <span
        onClick={handleShow}
        className="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
      >
        Add to category
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            options={categoryOptions}
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
