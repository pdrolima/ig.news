import { Header } from "../components/Header";
import { getStaticProps } from "next";
import { stripe } from "../services/stripe";
import { SubscribeButton } from "../components/SubscribeButton";
import { SessionProvider } from "next-auth/react";
import { SignInWithGitHub } from "../components/sIgnIn/GitHub";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <SessionProvider>
      <Header />
      <main className="text-white font-bold max-w-screen-lg mx-auto px-0 py-8 flex items-center justify-between">
        <section className="max-w-xl">
          <div>
            <span className="font-bold text-2xl py-4">👏 Hey, welcome!</span>
            <h1 className="text-4xl mt-6 leading-10">
              News about the <br /> <span className="text-sky-300">React</span>{" "}
              world
            </h1>
            <p className="py-4 leading-9 text-2xl text-lg">
              Get acess to all the publications <br />
              <span className="text-sky-300">
                for{" "}
                <span>
                  {Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.amount)}{" "}
                </span>
                month
              </span>
            </p>
            <SignInWithGitHub />
            <SubscribeButton priceId={product.priceId} />
          </div>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding react" />
      </main>
    </SessionProvider>
  );
}

export const getStaticProps: getStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KDDrkLTMaKidiDR3kSpWXrk");

  const product = {
    priceId: price.id,
    amount: price?.unit_amount / 100,
  };

  return { props: { product }, revalidate: 60 * 60 * 24 }; // 24 hours
};
