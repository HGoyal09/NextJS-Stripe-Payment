import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51Hh0EWHXCFaKJwPe8lUja4nUIX0HuSVrmpQNKzcUlP7BuKnt63Drr5Ql8z50rVuBSrdncr4ijvxH0lHBYR9LS9RV00gWbjtxuY");

export default async (req, res) => {

  const { id } = req.body;

  console.log("id = " + id);

  try {
    // const { error, paymentMethod } = await stripe.paymentMethods.create({
    const paymentMethod = await stripe.paymentMethods.create({
      payment_method: id
    }, {
      stripeAccount: 'acct_1HmYefQmK86Blyj5'
      // stripeAccount: 'acct_1HHuj1FJEkwhbu8Z'
    });

    if (paymentMethod.error) {
      console.log("error!! " + error)
    }
    else {

      console.log("clonedPaymentMethod = " + JSON.stringify(paymentMethod));

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: "USD",
        description: "Delicious empanadas",
        payment_method: paymentMethod.id,
        confirm: true
      }, {
        stripeAccount: 'acct_1HmYefQmK86Blyj5'
        // stripeAccount: 'acct_1HHuj1FJEkwhbu8Z'
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