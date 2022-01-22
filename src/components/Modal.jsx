import React, {useEffect} from "react";

export const Modal = (props) => {

  const onClick = (e) => {
    if (e.target.className === "fade") {
      props.onClose();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="fade" onClick={onClick}>
      {props.children}
    </div>
  );
}
