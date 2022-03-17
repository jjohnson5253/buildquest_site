//
// Home Page
//

import React, {} from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  // function for going to CreatePage. Passes currentAccount data
  const GoToCreatePage = () => {
    navigate('/CreatePage');
  }

  // function for going to UpdatePage. Passes currentAccount data
  const GoToUpdatePage = () => {
    navigate('/UpdatePage');
  }

  return (
      <div>
        <h1>Home Page</h1>

        {/* Buttons to go to other pages */}
        <button onClick={GoToCreatePage} className = "myButton">Create new game (Create)</button>
        <button onClick={GoToUpdatePage} className = "myButton">Submit proposal (Update)</button>
      </div>
  );
}

export default HomePage;
