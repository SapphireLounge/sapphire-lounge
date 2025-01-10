import { NextApiRequest, NextApiResponse } from 'next';

const PAYPAL_API = process.env.PAYPAL_SANDBOX === 'true'
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com';

async function getAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tierId, planId } = req.body;
    const accessToken = await getAccessToken();

    // Create subscription
    const response = await fetch(`${PAYPAL_API}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        plan_id: planId,
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/loyalty?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/loyalty?canceled=true`,
          user_action: 'SUBSCRIBE_NOW',
          brand_name: 'Sapphire Lounge',
        },
        custom_id: tierId,
      }),
    });

    const subscription = await response.json();

    if (subscription.status === 'APPROVAL_PENDING') {
      res.status(200).json({
        success: true,
        subscriptionId: subscription.id,
        approvalUrl: subscription.links.find((link: any) => link.rel === 'approve').href,
      });
    } else {
      throw new Error('Failed to create PayPal subscription');
    }
  } catch (error) {
    console.error('PayPal subscription creation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create subscription',
    });
  }
}
