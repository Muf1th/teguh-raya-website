/** Testimonials, FAQ and blog content. Edit freely — plain data, no code changes needed. */

export type Testimonial = {
  name: string;
  vehicle: string;
  quote: string;
  service: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Hj Amirul",
    vehicle: "Toyota Hilux",
    quote:
      "My Hilux had an overheating problem two other workshops could not solve. Teguh Raya pressure-tested the system, found the actual leak and fixed it once. It has been perfect since.",
    service: "Cooling System Repair",
  },
  {
    name: "Siti N.",
    vehicle: "Honda Civic",
    quote:
      "They showed me photos of the worn brake pads before doing anything and told me the discs were still fine. That honesty is why I keep coming back for every service.",
    service: "Brake Service",
  },
  {
    name: "Fleet Supervisor",
    vehicle: "Delivery fleet, 6 vans",
    quote:
      "Priority booking means our vans are never off the road for long, and one consolidated invoice each month makes my accounting simple. Exactly what a fleet needs.",
    service: "Fleet Maintenance",
  },
  {
    name: "Daniel W.",
    vehicle: "Kia Sportage",
    quote:
      "Booked over WhatsApp in the morning, car was ready by afternoon with a clear breakdown of what was done. Professional from start to finish.",
    service: "Full Vehicle Service",
  },
  {
    name: "Nurul H.",
    vehicle: "Toyota Vios",
    quote:
      "The pre-purchase inspection saved me from buying a car with hidden accident damage. Worth every dollar — I found a better car a week later and they checked that one too.",
    service: "Pre-Purchase Inspection",
  },
  {
    name: "Azman K.",
    vehicle: "Nissan Navara",
    quote:
      "Gearbox was slipping badly. They explained the repair options honestly, including the cheaper one. The truck shifts like new now.",
    service: "Transmission Repair",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How do I book a service?",
    a: "The fastest way is WhatsApp — use the booking form on this site and it opens WhatsApp with your details pre-filled, or message us directly at +673 869 4620. You can also call during working hours.",
  },
  {
    q: "Do I need an appointment, or can I just drive in?",
    a: "Walk-ins are welcome for quick jobs like oil services and battery checks, but booking ahead guarantees your slot and shortens your wait. Fleet clients always receive priority booking.",
  },
  {
    q: "Which vehicle makes do you work on?",
    a: "We service and repair all common makes in Brunei — Toyota, Honda, Nissan, Kia, Hyundai, Mitsubishi, Proton, Perodua and more. If you drive something unusual, message us first and we will confirm.",
  },
  {
    q: "Will I get a price before you start work?",
    a: "Yes. For repairs, we diagnose first and give you a clear estimate before any work begins. If we find something extra during the job, we contact you before touching it. No surprise bills.",
  },
  {
    q: "How long does a typical service take?",
    a: "An oil service takes under an hour and a full service around two to three hours. Repairs vary — we give you a realistic timeframe when we quote, and we update you if anything changes.",
  },
  {
    q: "Do you offer services for company vehicles?",
    a: "Yes — fleet maintenance is one of our core services. We offer tiered fleet packages with priority booking, consolidated monthly invoicing, per-vehicle service records and a dedicated contact person. See the Corporate Fleet page for details.",
  },
  {
    q: "Do you do welding, wiring or air-conditioning work?",
    a: "No — we focus on what we do best: car servicing and mechanical repair. For welding, wiring or air-con work we are happy to point you to specialists we trust.",
  },
  {
    q: "Can I supply my own parts?",
    a: "In most cases yes, though we cannot warranty parts we did not supply. We are always happy to advise on part quality before you buy.",
  },
  {
    q: "Where exactly are you located?",
    a: "Kampung Serambangun, Tutong District, Brunei Darussalam. There is a map with directions on our Contact page, or message us on WhatsApp and we will share our live location.",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  readMinutes: number;
  excerpt: string;
  body: string[]; // paragraphs
};

export const posts: Post[] = [
  {
    slug: "5-signs-your-brakes-need-attention",
    title: "5 Signs Your Brakes Need Attention Before They Fail",
    date: "2026-06-15",
    readMinutes: 4,
    excerpt:
      "Brakes rarely fail without warning. Here are the five signals Brunei drivers most often ignore — and what each one actually means.",
    body: [
      "Brake problems almost never appear out of nowhere. In our workshop in Tutong, nearly every serious brake repair we see was preceded by weeks of warning signs the driver noticed but put off. Here are the five that matter most.",
      "1. Squealing or grinding. A high-pitched squeal usually means the pad wear indicator is touching the disc — the pad is telling you it is nearly finished. Grinding is more serious: metal on metal, which damages the disc and turns a cheap pad change into an expensive disc replacement.",
      "2. A soft or spongy pedal. If the pedal travels further than it used to before the brakes bite, there may be air or moisture in the brake fluid, or a developing hydraulic leak. This one deserves a check within days, not weeks.",
      "3. Pulling to one side under braking. Often a sticking caliper or uneven pad wear. Apart from the safety issue, a sticking caliper drags constantly and burns fuel.",
      "4. Vibration or judder through the pedal. Usually warped or unevenly worn discs. It gets worse under hard braking — exactly when you need the brakes most.",
      "5. Longer stopping distances. The most dangerous sign because it creeps up gradually. If you find yourself braking earlier than you used to, have the system measured.",
      "A brake inspection at Teguh Raya takes under an hour, and we measure pads and discs against manufacturer specification rather than guessing. If they are fine, we tell you they are fine. Book through WhatsApp at +673 869 4620.",
    ],
  },
  {
    slug: "engine-overhaul-vs-replacement",
    title: "Engine Overhaul vs Replacement: Which Makes Sense for Your Car?",
    date: "2026-05-28",
    readMinutes: 5,
    excerpt:
      "When an engine reaches the end of its life, you have two real options. The right choice depends on the engine, the vehicle and your plans — here is how we advise customers.",
    body: [
      "When an engine is badly worn or damaged, owners face a genuine decision: rebuild the engine you have, or replace it with another unit. There is no universal answer, but there is a right answer for each situation.",
      "An overhaul means stripping your engine completely, measuring every wearing component, machining what can be saved and replacing what cannot — bearings, rings, gaskets, seals and often more. Done properly, a rebuilt engine can run reliably for many years. It makes the most sense when the engine block and head are sound, when your vehicle model has expensive or hard-to-find replacement engines, or when you know the full history of your own engine and want to keep it.",
      "Replacement means fitting a different engine — new, reconditioned or good used. It is usually faster and sometimes cheaper upfront, and it makes sense when your original engine has structural damage such as a cracked block, or when good used units for your model are plentiful and affordable in Brunei.",
      "The honest workshop answer: we assess first, then recommend. A compression and leak-down test plus a visual strip-down tells us whether your engine is worth rebuilding. If a replacement unit is the smarter money, we say so — even though an overhaul is the bigger job for us.",
      "If your engine is smoking, losing power, using oil or making noises it should not, bring it in before the damage spreads. An early diagnosis often means a smaller repair instead of either of these big jobs.",
    ],
  },
  {
    slug: "why-fleet-maintenance-contracts-save-money",
    title: "Why a Fleet Maintenance Contract Saves Your Business Money",
    date: "2026-05-10",
    readMinutes: 4,
    excerpt:
      "For businesses running vehicles in Brunei, ad-hoc repairs are the most expensive way to maintain a fleet. Here is the arithmetic behind planned maintenance.",
    body: [
      "If your business runs vehicles — deliveries, site visits, transport — every day a vehicle sits broken is a day it earns nothing while still costing money. Yet most small fleets in Brunei are maintained reactively: drive until something breaks, then scramble for a workshop slot.",
      "Planned maintenance flips that. Scheduled servicing catches wear items — brakes, belts, fluids, tyres — before they fail on the road. A worn timing belt replaced on schedule costs a fraction of the engine damage it causes when it snaps. A brake pad replaced at the right time protects the disc behind it.",
      "The second saving is administrative. With a fleet programme you receive one consolidated invoice per month instead of a drawer of receipts, per-vehicle service records for audits and resale, and a single dedicated contact who already knows your vehicles' histories.",
      "The third saving is downtime itself. Fleet clients at Teguh Raya receive priority booking, which means planned services happen on your schedule — early mornings, staggered so your operation keeps running — instead of whenever a slot opens up.",
      "We offer three fleet tiers — Basic, Standard and Premium — sized for fleets from two vehicles upward. Details are on our Corporate Fleet page, or message us on WhatsApp to arrange a fleet assessment.",
    ],
  },
];
