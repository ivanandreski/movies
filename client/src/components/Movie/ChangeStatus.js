import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "lib/axios";

const ChangeStatus = ({ movie }) => {
  const [download, setDownload] = useState(false);

  const handleClose = () => setDownload(false);
  const handleShow = () => setDownload(true);

  const handleChange = async (e) => {
    const status = e.target.value;
    try {
      await axios.put(`api/movies/${movie.id}/change-status`, {
        statusId: status,
      }, {
        headers: {
            "Content-Type": "application/json",
        }
      });
      setDownload(false);
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
        Status
      </span>
      <Modal show={download} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Download</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 p-2">
              <button
                className="btn btn-danger w-100"
                value="2"
                onClick={(e) => handleChange(e)}
              >
                Downloaded
              </button>
            </div>
            <div className="col-md-6 p-2">
              <button
                className="btn btn-primary w-100"
                value="3"
                onClick={(e) => handleChange(e)}
              >
                Watched
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeStatus;
