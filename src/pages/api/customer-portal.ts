import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the customer ID from the session/token
    const customerId = req.body.customerId;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/loyalty`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Customer portal error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create customer portal session',
    });
  }
}
