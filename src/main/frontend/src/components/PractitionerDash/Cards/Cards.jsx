import React from "react";
import "./Cards.css";
import { cardsData } from "../../../Data/CardsData";


const Cards = () => {
  return (
    <div className="Cards">
      {cardsData.map((val) => {
        return (
          <div className="cardsContainer">

            <div className="card-item">
                <p>{val.value}</p>
                <p>{val.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
