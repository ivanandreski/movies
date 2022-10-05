import React from "react";
import axios from "lib/axios";

const ExportUserData = () => {
  const handleExport = async (e) => {
    try {
        await axios.get(``)
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
