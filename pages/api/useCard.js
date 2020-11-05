import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51Hh0EWHXCFaKJwPe8lUja4nUIX0HuSVrmpQNKzcUlP7BuKnt63Drr5Ql8z50rVuBSrdncr4ijvxH0lHBYR9LS9RV00gWbjtxuY");

export default async (req, res) => {
  const { id } = req.body;
  const customer = await stripe.customers.retrieve('cus_IHb5honXATiqxV');
  try {
    await stripe.paymentIntents.create({
      amount: 100,
      currency: "USD",
      description: "Delicious success",
      payment_method: id,
      customer: customer.id,
      confirm: true
    });

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