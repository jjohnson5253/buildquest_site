//
// Create Page
//

import { NavLink } from "react-router-dom";
import React from 'react';

const CreatePage = () => {

  return (
    <div>
      <h1>Create Page</h1>
      
      <NavLink to="/HomePage"><button className = "myButton">Home Page</button></NavLink>
    </div>
  );
}

export default CreatePage;
