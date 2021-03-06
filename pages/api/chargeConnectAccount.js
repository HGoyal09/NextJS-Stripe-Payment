import Stripe from 'stripe';

const stripe = new Stripe('sk_test_key');

export default async (req, res) => {

  const { id } = req.body;

  try {
    const paymentMethod = await stripe.paymentMethods.create({
      payment_method: id
    }, {
      stripeAccount: 'acct_1Ga2f6HlzzKvaOuE'
    });

    if (paymentMethod.error) {
      console.log("error!! " + error)
    }
    else {

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: "USD",
        description: "POC test",
        payment_method: paymentMethod.id,
        confirm: true
      }, {
        stripeAccount: 'acct_1Ga2f6HlzzKvaOuE'
      });

      if (paymentIntent.error) {
        console.log("err = " + err);
      } else {
        console.log("payment intent = " + JSON.stringify(paymentIntent));
      }
    }

    return res.status(200).json({
      confirm: "abc123"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
}