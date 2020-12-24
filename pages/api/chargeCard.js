import Stripe from 'stripe';

const stripe = new Stripe('sk_test_key');

export default async (req, res) => {
  const { id } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount: 100,
      currency: "USD",
      description: "POC test",
      payment_method: id,
      confirm: true
    });
    return res.status(200).json({
      confirm: "abc123"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
};