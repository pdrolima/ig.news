import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { loadStripe } from "@stripe/stripe-js";
import { stripe } from "../../services/stripe";

export function SubscribeButton({ priceId }) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("/subscribe", { priceId: 1 });

      const { sessionId } = response.data;

      const stripeJs = await loadStripe("pk_test_9naDIxr62bPwc4WSNVNx2tst");

      stripeJs?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className="bg-orange-400 rounded-full text-neutral-900 font-bold p-4 w-64 h-16 hover:brightness-90
       flex items-center justify-center
      "
    >
      Subscribe Now
    </button>
  );
}
