import React from "react";
import "./styles.scss";
import ActionButton from "../../common/ActionButton";

function NoMovies() {
  return (
    <div className="No-Movies">
      <h2>Your movie list is empty</h2>
      <ActionButton text={"Add a new movie"} />
    </div>
  );
}

export default NoMovies;
  