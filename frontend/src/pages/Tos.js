export default function Tos() {
  const sections = [
    {
      h: "1. Demo Notice",
      p: "BOOSTER MAG is a demonstration project. It does not deliver real social-media followers, likes, or views, and no real payments are processed. All checkout flows are simulated for demonstration purposes only.",
    },
    {
      h: "2. No Real Charges",
      p: "The payment form on this site is a mock. Do not enter real card details. Any information submitted is treated as demo data and no transaction occurs.",
    },
    {
      h: "3. Simulated Fulfillment",
      p: "Order status and growth progress shown in the Dashboard are simulated and ramp up over time based on the selected delivery speed. They do not reflect any real change to any account.",
    },
    {
      h: "4. Acceptable Use",
      p: "You agree to use this demo for lawful, educational, and evaluation purposes only. Do not attempt to use it to interact with real third-party platforms.",
    },
    {
      h: "5. No Affiliation",
      p: "BOOSTER MAG is not affiliated with, endorsed by, or connected to Instagram, TikTok, or any other platform. All trademarks belong to their respective owners.",
    },
    {
      h: "6. Contact",
      p: "Questions about these terms can be sent through the Contact page.",
    },
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-display text-5xl uppercase text-center">Terms of Service</h1>
      <p className="text-center text-[var(--bm-muted)] mt-3">Last updated {new Date().getFullYear()}</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="text-lg font-semibold">{s.h}</h2>
            <p className="mt-2 text-[var(--bm-muted)]">{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
