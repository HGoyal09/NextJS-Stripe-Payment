import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51HhIrQGYLekXlSfFj2MTBJmzeVRcHJ2ZJv5mGoAiGgeWv99Vc3dcMOc910qsxNt7t0EpSVdDvwbyVcPsbX7TClVQ00dj424ylF');

export default async (req, res) => {
  const { id } = req.body;

  const customer = await stripe.customers.retrieve('cus_IMql7wAKAamZEr');

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "USD",
      description: "POC test",
      payment_method: id,
      customer: customer.id
    });

    return res.status(200).json({
      pm: paymentIntent,
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