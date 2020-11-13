import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51HhIrQGYLekXlSfFj2MTBJmzeVRcHJ2ZJv5mGoAiGgeWv99Vc3dcMOc910qsxNt7t0EpSVdDvwbyVcPsbX7TClVQ00dj424ylF');
export default async (req, res) => {
  try {
    // const customer = await stripe.customers.retrieve('cus_IHb5honXATiqxV');
    const customer = await stripe.customers.retrieve('cus_IMql7wAKAamZEr');
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