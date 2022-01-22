import React from "react";
import {Link} from "react-router-dom";

export const LanguageEntry = (props) => {

  return (
    <div className="dict-lang">
      <Link to={"/dictionary/terms?lang=" + props.iso2}>
        <img src={"/images/flag_" + props.iso2 + ".png"} alt={props.nativeName} title={props.nativeName}/>
      </Link>
    </div>
  );
}
