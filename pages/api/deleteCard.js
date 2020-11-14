import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51HhIrQGYLekXlSfFj2MTBJmzeVRcHJ2ZJv5mGoAiGgeWv99Vc3dcMOc910qsxNt7t0EpSVdDvwbyVcPsbX7TClVQ00dj424ylF');

export default async (req, res) => {
  const { id } = req.body;

  try {
    await stripe.paymentMethods.detach(
        id
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