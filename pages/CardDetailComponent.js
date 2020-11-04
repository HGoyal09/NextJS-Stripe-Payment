import React from "react";

function CardDetails({creditCards}) {
  if (creditCards) {
    const cards = creditCards.data.map((creditCard) => {
      return (
          <li>{creditCard.card.last4}</li>
      )
    });

    return (
        <ul className="list-unstyled">
          {cards}
        </ul>
    )
  } else {
    return <h2>No card found</h2>
  }
}


function RenderCard(props) {
  return (
      <div>
        <CardDetails creditCards={props.creditCards}/>
      </div>
  )
}

export default RenderCard;