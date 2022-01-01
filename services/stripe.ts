import Stripe from 'stripe'

export const stripe = new Stripe(
    'sk_test_ULd75n4xaBjLZLwVyNAh7u8n',
    {
      apiVersion: '2020-08-27',
      appInfo: {
        name: 'ig.news',
      }
    }
)
