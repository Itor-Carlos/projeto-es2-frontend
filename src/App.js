import React, { StrictMode } from "react";
import { SideBar } from "./components/SideBar";

function App() {
  return (
   <StrictMode>
      <div className="App">
        <h1>Inicio do projeto</h1>
        <SideBar/>
      </div>
   </StrictMode>
  );
}

export default App;
