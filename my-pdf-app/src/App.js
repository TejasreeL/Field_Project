import React from "react";
import "./form.css";
import Pubs from "./publicationForm";
import FetchFacultyData from "./GPDF.js";
function App() {
  return (
    <div className="App">
      <Pubs />
      {/* <FetchFacultyData /> */}
    </div>
  );
}

export default App;
