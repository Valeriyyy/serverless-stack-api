import stripePackage from "stripe";
import handler from "./libs/handler-lib";
import { calculateCost } from "./libs/billing-lib";

export const main = handler(async (event, context) => {
  //storage = number of notes user would like to store in their account
  //source = stripe token for the card we are going to charge
  const { storage, source } = JSON.parse(event.body);

  const amount = calculateCost(storage);
  const description = "Scratch charge";

  const stripe = stripePackage(process.env.stripeSecretKey);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });

  return { status: true };
});
