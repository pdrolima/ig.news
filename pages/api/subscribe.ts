import { stripe } from './../../services/stripe';
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';
import { fauna } from '../../services/fauna';
import { query as q } from "faunadb"

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({ req })

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method now allowed');
        return;
    }


    const user = await fauna.query(
        q.Get(
            q.Match(
                q.Index('user_by_email'),
                q.Casefold(session.user.email)
            )
        )
    )


    let customerId = user.data.stripe_customer_id

    if (!customerId) {
        const customer = await stripe.customers.create({
            email: session.user?.email,
        });


        await fauna.query(
            q.Update(
                q.Ref(q.Collection('users'), user.ref.id), {
                    data: {
                        stripe_customer_id: customer.id
                    }
                })
            )

        customerId = customer.id
    }


    const checkout = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card', 'boleto'],
        billing_address_collection: 'required',
        line_items: [
            {
                price: 'price_1KDDrkLTMaKidiDR3kSpWXrk',
                quantity: 1,
            }
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: 'http://localhost:3000/posts',
        cancel_url: 'http://localhost:3000/'
    });

    return res.status(200).json({ sessionId: checkout.id })
}
