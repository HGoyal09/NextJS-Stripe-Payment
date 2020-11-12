import React, {Component} from "react";
import { Button } from "reactstrap";
import axios from "axios";
import UpdateCard from "./CardUpdateComponent";
import {CardCvcElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51Hh0EWHXCFaKJwPeFxcpLt5Wm7iLZVsIKmPh1ZIzd7ekrqN5mMpUgKeATeZ9GaU9A4zHI9J6nNl3onwWTGQd1egW00b9iowpNO');


const CvcElement = ({selectedCard}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();
      try {
        const paymentIntent = await axios.post("/api/useCard", {id: selectedCard.id});

        await stripe.confirmCardPayment(
            paymentIntent.data.pm.client_secret, {
              payment_method_options: {
                card: {
                  cvc: elements.getElement(CardCvcElement)
                }
              }
            }
        );
      } catch (error) {
        console.log(error);
      }
  };

  return (
      <div>
        <form onSubmit={handleSubmit}>
            <CardCvcElement/>
            <button type="submit" disabled={!stripe}>
              Make Payment
            </button>
        </form>
      </div>
  )};



class HandleSelectedCard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      updateCard: false,
      pay: false
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
    this.setState({
      pay: true
    });
  };

  handleDelete = async () => {
    const id = this.props.selectedCard.id;
    await axios.post("/api/deleteCard", {id});
  };

  render() {

    const update = () => {
      return this.state.updateCard ? <UpdateCard selectedCard={this.props.selectedCard}/> : <div/>
    };

    const cardCvc = () => {
      return this.state.pay ? <Elements stripe={stripePromise}> <CvcElement selectedCard={this.props.selectedCard}/> </Elements> : <div/>
    };

    if (this.props.selectedCard) {
      return (
          <div>
            <h2>Selected Card:</h2>
            <div>Last 4 digit = {this.props.selectedCard.card.last4}</div>
            <div>Expiry year = {this.props.selectedCard.card.exp_year}</div>
            <div>Expiry month = {this.props.selectedCard.card.exp_month}</div>
            <Button onClick={this.updateCard}>Update Card</Button>
            <Button onClick={this.handleDelete}>Delete Card</Button>
            <Button onClick={this.pay}>Pay using this card</Button>

            <br/>
            {update()}
            {cardCvc()}
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