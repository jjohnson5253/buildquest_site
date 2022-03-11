import React, { } from "react";
import "./App.scss";
import HomePage from "./components/HomePage";
import CreatePage from "./components/CreatePage";
import UpdatePage from "./components/UpdatePage";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {


  return (
    /*Set up routes for multiple pages*/
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/CreatePage" element={<CreatePage />} />
        <Route path="/UpdatePage" element={<UpdatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
