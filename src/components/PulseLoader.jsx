import React from "react";

export const PulseLoader = (props) => {

  const style = {
    backgroundColor: props.color || "#4dce68",
    width: props.size || "15px",
    height: props.size || "15px",
    margin: props.margin || "2px"
  }

  return props.loading
    ? (
      <div className="loader">
        <span className="ellipsis1" style={style}/>
        <span className="ellipsis2" style={style}/>
        <span className="ellipsis3" style={style}/>
      </div>
    )
    : (<></>);
}
