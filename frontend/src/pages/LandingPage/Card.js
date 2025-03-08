import React from "react";

const Card = (props) => {
  return (
    <div
      className="card text-center landing_cards  mx-auto"
      style={{ width: "20rem" }}
    >
      <img
        src={require(`./../../img/${props.img}`)}
        className="mx-auto"
        style={{ width: 60 }}
        alt="flex img"
      />
      <div className="card-body">
        <h5 className="font-semibold text-xl">{props.heading}</h5>
        <p className="font-normal text-sm text-center">{props.description}</p>
      </div>
    </div>
  );
};

export default Card;
