import React, { useState } from "react";
import axios from "lib/axios";

const ImportUserData = ({ username }) => {
  const [file, setFile] = useState();

  const handleImport = async (e) => {
    e.preventDefault(); 
    let formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `/api/users/${username}/import`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <h1 className="mb-2">Import:</h1>
      <form onSubmit={handleImport}>
        <div className="row">
          <div className="col-md-10">
            <input
              type="file"
              name="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100">Import</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImportUserData;
