export type Experience = {
  slug: string;
  sceneKey: "oil" | "brakes" | "suspension" | "mounts" | "clutch" | "timing";
  name: string;
  tagline: string;
  problem: string;
  causes: string;
  symptoms: string[];
  parts: string[];
  outcome: string;
  serviceSlug: string; // anchor on the /services page
};

export const experiences: Experience[] = [
  {
    slug: "engine-oil-service",
    sceneKey: "oil",
    name: "Engine Oil Service",
    tagline: "Watch old oil drain out and fresh protection flow in.",
    problem:
      "Engine oil breaks down with heat and time. It darkens, thickens with contaminants, and slowly loses the ability to protect the metal parts moving thousands of times per minute inside your engine.",
    causes:
      "Normal use — every kilometre driven, every cold start, and Brunei's tropical heat all age the oil. It's not a fault; it's a service interval.",
    symptoms: [
      "Dark, dirty oil on the dipstick",
      "Engine sounds slightly rougher or louder",
      "Service light or sticker interval reached",
    ],
    parts: ["Engine oil (correct grade for your engine)", "Oil filter", "Drain plug washer"],
    outcome:
      "Fresh oil restores full lubrication and cooling. Bearings, pistons and the camshaft run protected — the single cheapest way to make an engine last.",
    serviceSlug: "oil-and-filter-service",
  },
  {
    slug: "brake-service",
    sceneKey: "brakes",
    name: "Brake Service",
    tagline: "See worn pads replaced and safe braking restored.",
    problem:
      "Brake pads are designed to wear away — that's how they work. Past their limit, stopping distances grow, and the metal backing can grind into the disc, turning a cheap job into an expensive one.",
    causes:
      "Every stop wears the pads slightly. City driving, hills and heavy loads accelerate it.",
    symptoms: [
      "Squealing or grinding when braking",
      "Longer stopping distances",
      "Vibration through the brake pedal",
    ],
    parts: ["Brake pads", "Brake discs (only if worn below specification)", "Brake fluid if due"],
    outcome:
      "Full braking force returns. Shorter, quieter, confident stops — measured against manufacturer specification, not guesswork.",
    serviceSlug: "brake-service",
  },
  {
    slug: "suspension-repair",
    sceneKey: "suspension",
    name: "Suspension Repair",
    tagline: "From bouncing and knocking to a smooth, stable ride.",
    problem:
      "Shock absorbers contain oil under pressure. When seals fail, the oil leaks out and the shock stops damping — the car floats, bounces and leans, and tyres lose grip on uneven roads.",
    causes:
      "Age, potholes, speed bumps taken hard, and heavy loads. Rubber bushings also perish in tropical heat.",
    symptoms: [
      "Bouncing that continues after a bump",
      "Knocking sounds over rough roads",
      "Uneven tyre wear or a floaty feeling at speed",
    ],
    parts: ["Shock absorbers", "Bushings and mounts as needed", "Link rods if worn"],
    outcome:
      "The car sits level, absorbs bumps in one smooth motion, and steers precisely — safer in the wet and far more comfortable.",
    serviceSlug: "suspension-and-steering",
  },
  {
    slug: "engine-mount-replacement",
    sceneKey: "mounts",
    name: "Engine Mount Replacement",
    tagline: "Stop the shakes — feel the cabin go still.",
    problem:
      "Engine mounts are rubber-and-metal cushions holding your engine. When the rubber cracks or collapses, engine vibration passes straight into the body — you feel it in the seats, the wheel, the mirror.",
    causes:
      "Rubber ages and hardens, especially in heat. Hard acceleration and worn mounts on one side overload the others.",
    symptoms: [
      "Vibration at idle, felt through the cabin",
      "A clunk when shifting between D and R",
      "Visible engine movement when revved",
    ],
    parts: ["Engine mounts (usually replaced in pairs or sets)"],
    outcome:
      "The engine sits cushioned again. Idle becomes smooth, gear changes soften, and the cabin goes quiet.",
    serviceSlug: "engine-repair",
  },
  {
    slug: "clutch-replacement",
    sceneKey: "clutch",
    name: "Clutch Replacement",
    tagline: "Gearbox out, new clutch in, power restored.",
    problem:
      "The clutch transfers engine power to the gearbox through friction. As it wears thin, it slips — the engine revs but the car doesn't pull — and eventually it fails completely.",
    causes:
      "Normal wear over tens of thousands of kilometres; riding the clutch and hill starts accelerate it.",
    symptoms: [
      "Revs rise but speed doesn't (slipping)",
      "A burning smell after hills or towing",
      "High or vague biting point",
    ],
    parts: ["Clutch plate", "Pressure plate", "Release bearing", "Flywheel checked/machined"],
    outcome:
      "Crisp, full power transfer with a light, predictable pedal — the whole kit replaced in one job so it lasts.",
    serviceSlug: "clutch-replacement",
  },
  {
    slug: "timing-belt-replacement",
    sceneKey: "timing",
    name: "Timing Belt Replacement",
    tagline: "The most important belt in your engine, perfectly aligned.",
    problem:
      "The timing belt synchronises the crankshaft and camshaft so valves and pistons never collide. Old belts crack and can snap without warning — and when they do, the engine can destroy itself in seconds.",
    causes:
      "Rubber ages with time and heat regardless of driving style. That's why it has a strict replacement interval by kilometres AND years.",
    symptoms: [
      "Usually none — that's the danger",
      "Interval reached in the service book",
      "Ticking from the timing cover (late stage)",
    ],
    parts: ["Timing belt", "Tensioner and idler pulleys", "Water pump where belt-driven"],
    outcome:
      "Valves and pistons stay perfectly synchronised. One scheduled job prevents the most expensive engine failure there is.",
    serviceSlug: "timing-belt-and-chain",
  },
];

/** service page slug -> experience slug, for "watch this repair" links */
export const experienceForService: Record<string, string> = Object.fromEntries(
  experiences.map((e) => [e.serviceSlug, e.slug])
);
