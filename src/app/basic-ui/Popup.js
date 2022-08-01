import React from "react";

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <div onClick={props.handleClose} className="close-icon"> <p> RETURN </p>  </div>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;