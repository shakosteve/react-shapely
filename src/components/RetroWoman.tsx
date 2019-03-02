import * as React from "react";
import RetroWomanImage from "../images/retrowoman3.svg";
import "../styles/App.css";
function RetroWoman() {
  return (
    <div className="RetroWoman">
      "Did you know triangles have legs too?"
      <img className="RetroWomanImage" src={RetroWomanImage} />
    </div>
  );
}

export default RetroWoman;
