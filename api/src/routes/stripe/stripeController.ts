import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;

export async function getKeys(req: Request, res: Response) {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
}

export async function createPaymentIntent(req: Request, res: Response) {
  const { orderId } = req.body;
  // const [order] = await db
  //   .select()
  //   .from(ordersTable)
  //   .where(eq(ordersTable.id, orderId));
  const orderItems = await db
    .select()
    .from(orderItemsTable)
    .where(eq(orderItemsTable.orderId, orderId));

  // calculate total sum of orderItems price * quantity
  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const amount = Math.floor(total * 100);

  if (amount === 0) {
    res.status(400).json({ message: 'Order total is 0' });
    return;
  }

  // TODO: Add info about the user
  const customer = await stripe.customers.create();

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2024-09-30.acacia' }
  );

  // TODO: calculate the amount dynamically
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    customer: customer.id,
  });

  // store paymentIntent.id in order database
  await db
    .update(ordersTable)
    .set({ stripePaymentIntentId: paymentIntent.id })
    .where(eq(ordersTable.id, orderId));

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
}

export async function webhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody!, sig!, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await db
        .update(ordersTable)
        .set({ status: 'payed' })
        .where(eq(ordersTable.stripePaymentIntentId, paymentIntent.id));
      break;
    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object;
      await db
        .update(ordersTable)
        .set({ status: 'payment_failed' })
        .where(eq(ordersTable.stripePaymentIntentId, paymentIntentFailed.id));
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
