import React from "react";

import { RiseLoader } from "react-spinners";

const Loader = ({ loading, size = 40, color = "#000000" }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      
      <RiseLoader />
    </div>
  );
};

export default Loader;
