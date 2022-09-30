import React, { useState, useEffect } from "react";

const Torrents = ({ movie }) => {

  useEffect(() => {
    const fetchTorrents = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchTorrents();
  }, []);
  return <div>Torrents</div>;
};

export default Torrents;
