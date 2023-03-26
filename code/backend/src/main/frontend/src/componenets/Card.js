import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div class="card w-75 mb-3 ">
      <div class="card-body">
        {props.title && (
          <h5 className="card-title text-bg-info">{props.title}</h5>
        )}
        {props.children}
      </div>
    </div>
  );
};
export default Card;
