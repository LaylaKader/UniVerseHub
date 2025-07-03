import React from "react";
import { SyncLoader } from "react-spinners";

function Loader() {
  // Style for the loader container
  const loaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full height of the viewport
    width: "100vw", // Full width of the viewport
    backgroundColor: "rgba(240, 240, 240, 0.8)", // Slightly transparent background color
    backdropFilter: "blur(30px)", // Apply blur effect
    position: "fixed", // Fixed positioning
    top: 0,
    left: 0,
    zIndex: 9999, // Make sure it appears on top of other elements
  };

  return (
    <div style={loaderStyle}>
      <SyncLoader color="#000" size={15} margin={5} /> {/* Green loader */}
    </div>
  );
}

export default Loader;
