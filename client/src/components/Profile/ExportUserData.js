import React from "react";
import axios from "lib/axios";

const ExportUserData = ({ username }) => {
  const handleExport = async (e) => {
    try {
      const fileType = e.target.value;
      const response = await axios.get(
        `/api/users/${username}/export?fileType=${fileType}`,
        { responseType: "blob" }
      );
      console.log(response.data);
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `export.${fileType}`); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <h1 className="mb-2">Export:</h1>
      <div className="col-md-3">
        <button
          value="json"
          className="btn btn-danger w-100"
          onClick={handleExport}
        >
          Json
        </button>
      </div>
      <div className="col-md-3">
        <button
          value="csv"
          className="btn btn-success w-100"
          onClick={handleExport}
        >
          Csv
        </button>
      </div>
      <div className="col-md-3"></div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default ExportUserData;
