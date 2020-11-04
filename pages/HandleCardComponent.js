import React, {Component} from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "axios";

class HandleSelectedCard extends Component{
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = async () => {
    const id = this.props.selectedCard.id;
    await axios.post("/api/deleteCard", {id});
  };

  render() {
    if (this.props.selectedCard) {
      return (
          <div>
            <h2>Selected Card:</h2>
            <div>Last 4 digit = {this.props.selectedCard.card.last4}</div>
            <div>Expiry = {this.props.selectedCard.card.exp_year}</div>
            <Button onClick={this.handleDelete}>Delete Card</Button>
          </div>
      )
    } else {
      return (
          <h2>Select a card</h2>
      )
    }
  }
}

export default HandleSelectedCard;