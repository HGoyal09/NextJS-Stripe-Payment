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

const paymentIds = new Array(2);

const CheckoutForm = ({formId}) => {
  const stripe = useStripe();
  const elements = useElements();



  const handleChange = async (change) => {
    if (change.complete) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
      });

      if (!error) {
        const {id} = paymentMethod;
        try {
          console.log("payment id = " + id);
          paymentIds[formId] = id;
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
      <div>
        <form style={{maxWidth:"400px", margin: "0 auto", minHeight:"100px"}}>
          <CardElement
              onChange={handleChange}
          />
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

  payConnectAccount = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/chargeConnectAccount",{id: paymentIds[0]});
    } catch (error) {
      console.log(error);
    }
  };



  getCardDetails = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/listCards");

      this.setState({
        creditCards: data
      })

    } catch (error) {
      console.log(error);
    }
  };

  async handleAddCard(event) {
    event.preventDefault();
    for (const paymentId of paymentIds) {
      console.log("payment id = " + paymentId);

      try {
        await axios.post("/api/addCard", {id: paymentId});
      } catch (error) {
        console.log(error);
      }
    }
  }

  async handlePayment(event) {
    event.preventDefault();
    for (const paymentId of paymentIds) {
      try {
        await axios.post("/api/chargeCard", {id: paymentId});
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
        <div>
          <button onClick={this.getCardDetails}>List Credit Cards</button>
          <RenderCard creditCards={this.state.creditCards}/>
        <form>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm formId={0}/>
            </Elements>

            <Elements stripe={stripePromise}>
              <CheckoutForm formId={1}/>
            </Elements>
          </div>

          <button type="submit" onClick={this.handleAddCard}>
            Add Card
          </button>

          <button type="submit" onClick={this.handlePayment}>
            Pay Now
          </button>
        </form>


          <button onClick={this.payConnectAccount}>Pay connect account</button>
        </div>
    )
  }
}

export default Main;