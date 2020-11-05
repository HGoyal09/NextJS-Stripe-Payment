import React, {Component} from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "axios";
import UpdateCard from "./CardUpdateComponent";

class HandleSelectedCard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      updateCard: false
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.pay = this.pay.bind(this);
    this.updateCard = this.updateCard.bind(this);
  }

  updateCard = async () => {
    this.setState({
      updateCard: true
    });
  };

  pay = async () => {
    const id = this.props.selectedCard.id;
    await axios.post("/api/useCard", {id});
  };

  handleDelete = async () => {
    const id = this.props.selectedCard.id;
    await axios.post("/api/deleteCard", {id});
  };

  render() {

    const update = () => {
      return this.state.updateCard ? <UpdateCard selectedCard={this.props.selectedCard}/> : <div></div>
    };

    if (this.props.selectedCard) {
      return (
          <div>
            <h2>Selected Card:</h2>
            <div>Last 4 digit = {this.props.selectedCard.card.last4}</div>
            <div>Expiry = {this.props.selectedCard.card.exp_year}</div>
            <Button onClick={this.updateCard}>Update Card</Button>
            <Button onClick={this.handleDelete}>Delete Card</Button>
            <Button onClick={this.pay}>Pay using this card</Button>

            <br/>
            {update()}
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