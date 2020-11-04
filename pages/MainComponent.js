import React, {Component} from 'react';
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from 'axios';

import RenderCard from "./CardDetailComponent";

const stripePromise = loadStripe('pk_test_51Hh0EWHXCFaKJwPeFxcpLt5Wm7iLZVsIKmPh1ZIzd7ekrqN5mMpUgKeATeZ9GaU9A4zHI9J6nNl3onwWTGQd1egW00b9iowpNO');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const {id} = paymentMethod;
      try {
        await axios.post("/api/addCard", {id});
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
      <div>
        <form onSubmit={handleSubmit} style={{maxWidth:"400px", margin: "0 auto"}}>
          <CardElement/>
          <button type="submit" disabled={!stripe}>
            Save
          </button>
        </form>
      </div>
  )
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creditCards: null
    };

    this.getCardDetails = this.getCardDetails.bind(this);
  }

  getCardDetails = async () => {
    try {
      const { data } = await axios.post("/api/listCards");

      this.setState({
        creditCards: data
      })

    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
        <div>
          <button onClick={this.getCardDetails}>List Credit Cards</button>
          <RenderCard creditCards={this.state.creditCards}/>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
    )
  }
}

export default Main;