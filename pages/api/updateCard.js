import Stripe from 'stripe';

const stripe = new Stripe('sk_test_key');

export default async (req, res) => {
  const { expiryMonth, selectedCard } = req.body;

  try {
    await stripe.paymentMethods.update(
        selectedCard.id,
        {card: {exp_month: expiryMonth}}
    );
    return res.status(200).json({
      confirm: "abc1234"
    });
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
}