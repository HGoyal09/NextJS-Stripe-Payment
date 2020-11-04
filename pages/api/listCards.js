import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51Hh0EWHXCFaKJwPe8lUja4nUIX0HuSVrmpQNKzcUlP7BuKnt63Drr5Ql8z50rVuBSrdncr4ijvxH0lHBYR9LS9RV00gWbjtxuY");

export default async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve('cus_IHb5honXATiqxV');
    const cards = await stripe.paymentMethods.list({
      customer: customer.id,
      type: 'card'
    });
    return res.status(200).json({
      data: cards.data
    });
  }

  catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
}