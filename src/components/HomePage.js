//
// Home Page
//

import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
        <div>
          <h1>Home Page</h1>

          <NavLink to="/CreatePage">CreatePage</NavLink>
          <br></br><br></br>
          <NavLink to="/UpdatePage">UpdatePage</NavLink>
          
        </div>
    );
  }
}

export default HomePage;
