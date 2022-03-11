//
// Update Page
//

import { NavLink, useLocation } from "react-router-dom";

import React, { } from "react";

const UpdatePage = () => {

  // get location which allows us to access data passed through router.
  // We can pass info like currentConnected wallet
  let location = useLocation();

  return (
    <div>
      <h1>Update Page</h1>

      <p>Connected Account: {location.state.currentAccount}</p>

      <NavLink to="/HomePage"><button className = "myButton">Home Page</button></NavLink>
    </div>
  );
}

export default UpdatePage;
