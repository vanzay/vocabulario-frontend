import React from "react";

// see https://github.com/schiehll/react-alert-template-basic/blob/master/src/index.js

const errorStyle = {
  margin: "10px 0",
  padding: "10px",
  backgroundColor: "#ff401a",
  color: "white",
  textAlign: "center",
  borderRadius: "3px",
  boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.03)",
  width: "300px",
  boxSizing: "border-box"
}

const AlertTemplate = ({message, options, style}) => {
  if (options.type === "error") {
    return (
      <div style={{...errorStyle, ...style}}>
        {message}
      </div>
    )
  }
  return (<></>);
}

export default AlertTemplate
