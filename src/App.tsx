import * as React from "react";
import ShapeSelector from './components/ShapeSelector';
import "./styles/App.css";
import RetroWomanImage from "/src/images/retrowoman3.svg";
import RetroManImage from "/src/images/telephone3.svg";


function App() {
  return (
    <div className="App">
      <div className="AppComponentStyle">
        <div className="RetroMan">
          <img className="RetroManImage" src={RetroManImage} />
          "Show me your circumference and I will show you my radius"
    </div>
        <ShapeSelector />

        <div className="RetroWoman">
          "Did you know triangles have legs too?"
      <img className="RetroWomanImage" src={RetroWomanImage} />
        </div>
      </div>
    </div>
  );
}

export default App;
