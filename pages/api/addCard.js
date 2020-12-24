import Stripe from 'stripe';
const stripe = new Stripe('sk_test_key');

export default async (req, res) => {
  const { id } = req.body;

  try {
    const customer = await stripe.customers.retrieve('cus_IMql7wAKAamZEr');

    await stripe.paymentMethods.attach(
        id,
        {customer: customer.id}
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