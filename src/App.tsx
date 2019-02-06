import * as React from "react";
import RetroMan from "./components/RetroMan";
import RetroWoman from "./components/RetroWoman";
import ShapeSelector from './components/ShapeSelector';
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <div className="AppComponentStyle">
        <RetroMan /><ShapeSelector /><RetroWoman />
      </div>
    </div>
  );
}

export default App;
