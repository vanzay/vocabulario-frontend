import React from "react";
import {Link} from "react-router-dom";

export const NavigationItem = (props) => {

  return (
    <Link to={props.link} className="w-inline-block nav_link">
      <div className="nav_link_txt">{props.title}</div>
    </Link>
  );
}
