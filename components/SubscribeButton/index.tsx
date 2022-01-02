export function SubscribeButton({ priceId }: { priceId: string }) {
  return (
    <button
      type="button"
      className="bg-orange-400 rounded-full text-neutral-900 font-bold p-4 w-64 h-16 hover:brightness-90
       flex items-center justify-center
      "
    >
      Subscribe Now
    </button>
  );
}
