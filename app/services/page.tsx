export default function Services() {
  const services = [
    {
      name: "Websites & apps",
      detail: "Custom sites and web apps, deployed with post-launch care and PWA support.",
      price: "From NPR 10,000"
    },
    {
      name: "UI/UX & graphic design",
      detail: "Interface design, logos, pamphlets, and brand assets.",
      price: "Quoted per project"
    },
    {
      name: "Digital marketing & SEO",
      detail: "Search visibility, social media, and content built around what you sell.",
      price: "Quoted per project"
    },
    {
      name: "Hospitality marketing",
      detail: "Booking-ready websites and social presence for hotels and restaurants.",
      price: "Quoted per project"
    },
    {
      name: "Govt. forms & DEMAT help",
      detail: "Form filling for licenses, passports, and related applications, plus share market guidance.",
      price: "Quoted per task"
    },
    {
      name: "Cloud & domain setup",
      detail: "Domain, hosting, and cloud configuration for your project.",
      price: "Quoted per project"
    }
  ];

  return (
    <main className="section container-narrow">
      <h1 className="max-w-2xl text-[36px] font-semibold tracking-tightest sm:text-[46px]">
        Services
      </h1>
      <p className="mt-4 max-w-xl text-[16px] text-textMuted">
        Every project starts with a short call to scope the work. Prices below
        are starting points, not final quotes.
      </p>

      <div className="mt-12 divide-y divide-border border-t border-border">
        {services.map((s) => (
          <div key={s.name} className="flex flex-col justify-between gap-2 py-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[16px] font-medium">{s.name}</p>
              <p className="mt-1 max-w-md text-[14px] text-textMuted">{s.detail}</p>
            </div>
            <p className="text-[14px] text-accent">{s.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
