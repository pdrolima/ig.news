import { Header } from '../components/Header';
import { getServerSideProps } from 'next';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <h1 className="text-white">{product.amount}</h1>
      <Header />
    </>
  );
}

export const getServerSideProps: getServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1KDDrkLTMaKidiDR3kSpWXrk', {
    expand: ['product'],
  });

  console.log(price);

  const product = {
    priceId: price.id,
    amount: price?.unit_amount / 100,
  };

  return { props: { product } };
};
