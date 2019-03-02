import * as React from "react";
import RetroManImage from "../images/telephone3.svg";
import "../styles/App.css";

function RetroMan() {
  return (
    <div className="RetroMan">
      <img className="RetroManImage" src={RetroManImage} />
      "Show me your circumference and I will show you my radius"
    </div>
  );
}

export default RetroMan;
