export type Service = {
  slug: string;
  code: string; // job-card style reference shown on cards, e.g. "TR-01"
  name: string;
  category: "Servicing" | "Engine & Drivetrain" | "Chassis & Brakes" | "Inspection & Fleet";
  summary: string;
  benefits: string[];
  process: string[];
  duration: string;
};

export const services: Service[] = [
  {
    slug: "oil-and-filter-service",
    code: "TR-01",
    name: "Oil & Filter Service",
    category: "Servicing",
    summary:
      "Engine oil and filter change using grades matched to your vehicle, with a complimentary visual check of belts, fluids and tyres on every visit.",
    benefits: [
      "Protects the engine and extends its life",
      "Correct oil grade for Brunei driving conditions",
      "Early warning on wear items before they become repairs",
    ],
    process: [
      "Confirm the correct oil grade and filter for your vehicle",
      "Drain, replace filter and refill to specification",
      "Visual check of belts, hoses, fluids and tyres",
      "Reset service indicator and record the service",
    ],
    duration: "45 – 60 minutes",
  },
  {
    slug: "full-vehicle-service",
    code: "TR-02",
    name: "Full Vehicle Service",
    category: "Servicing",
    summary:
      "A complete scheduled service covering oil, filters, brakes, fluids and a multi-point inspection — the maintenance your vehicle manual actually asks for.",
    benefits: [
      "Keeps the vehicle reliable and safe between services",
      "Documented service history that protects resale value",
      "One visit covers everything on the schedule",
    ],
    process: [
      "Multi-point inspection and road test",
      "Oil, oil filter and air filter replacement",
      "Brake, coolant and fluid checks with top-up",
      "Report of findings with honest recommendations",
    ],
    duration: "2 – 3 hours",
  },
  {
    slug: "engine-repair",
    code: "TR-03",
    name: "Engine Repair",
    category: "Engine & Drivetrain",
    summary:
      "Diagnosis and repair of engine faults — misfires, overheating, oil leaks, loss of power — fixed at the cause, not patched at the symptom.",
    benefits: [
      "Accurate diagnosis before any part is replaced",
      "Repairs explained in plain language with photos",
      "Restores performance and fuel economy",
    ],
    process: [
      "Road test and inspection to confirm the fault",
      "Written estimate before work begins",
      "Repair with quality parts and correct torque specs",
      "Final road test and quality check",
    ],
    duration: "Same day to 3 days, depending on the fault",
  },
  {
    slug: "engine-overhaul",
    code: "TR-04",
    name: "Engine Overhaul",
    category: "Engine & Drivetrain",
    summary:
      "Complete engine strip-down, measurement and rebuild for high-mileage or damaged engines — often the smarter alternative to replacing the vehicle.",
    benefits: [
      "Significantly cheaper than a new vehicle",
      "Worn components measured and replaced, not guessed",
      "Rebuilt to run reliably for years, not months",
    ],
    process: [
      "Compression and leak-down assessment",
      "Full strip-down with photographed documentation",
      "Machining, new bearings, rings, gaskets and seals as needed",
      "Careful reassembly, first start procedure and run-in advice",
    ],
    duration: "5 – 10 working days",
  },
  {
    slug: "engine-replacement",
    code: "TR-05",
    name: "Engine Replacement",
    category: "Engine & Drivetrain",
    summary:
      "Supply and installation of replacement engines when an overhaul is no longer economical, including sourcing advice on new and used units.",
    benefits: [
      "Honest advice on overhaul versus replacement",
      "Help sourcing a reliable replacement unit",
      "All mounts, fluids and connections done properly",
    ],
    process: [
      "Assessment and honest overhaul-vs-replace recommendation",
      "Source and verify the replacement engine",
      "Removal, installation and full fluid service",
      "Extended road test before handover",
    ],
    duration: "3 – 7 working days",
  },
  {
    slug: "transmission-gearbox-repair",
    code: "TR-06",
    name: "Transmission & Gearbox Repair",
    category: "Engine & Drivetrain",
    summary:
      "Repair and servicing of automatic and manual gearboxes — slipping, harsh shifting, whining or fluid leaks diagnosed and put right.",
    benefits: [
      "Catches gearbox problems before total failure",
      "Fluid and filter services that extend transmission life",
      "Smooth, confident shifting restored",
    ],
    process: [
      "Road test to reproduce the symptom",
      "Fluid condition and leak inspection",
      "Repair, seal replacement or fluid service as required",
      "Post-repair road test through all gears",
    ],
    duration: "1 – 5 working days",
  },
  {
    slug: "clutch-replacement",
    code: "TR-07",
    name: "Clutch Replacement",
    category: "Engine & Drivetrain",
    summary:
      "Full clutch kit replacement for manual vehicles — plate, cover and release bearing — with flywheel inspection included as standard.",
    benefits: [
      "Complete kit replaced in one job, no repeat labour",
      "Flywheel checked so the new clutch lasts",
      "Pedal feel and biting point restored",
    ],
    process: [
      "Confirm clutch wear versus hydraulic fault",
      "Gearbox removal and full kit replacement",
      "Flywheel inspection and hydraulic bleed",
      "Adjustment and road test",
    ],
    duration: "1 – 2 working days",
  },
  {
    slug: "brake-service",
    code: "TR-08",
    name: "Brake Service",
    category: "Chassis & Brakes",
    summary:
      "Pads, discs, drums, fluid and hydraulics — inspected, measured against specification and replaced only when genuinely needed.",
    benefits: [
      "Shorter, safer stopping distances",
      "Components measured, not replaced on guesswork",
      "Squeaks, judder and soft pedals resolved",
    ],
    process: [
      "Measure pad and disc thickness against specification",
      "Inspect calipers, hoses and brake fluid condition",
      "Replace worn components and bleed the system",
      "Bed-in procedure and brake test",
    ],
    duration: "1 – 3 hours",
  },
  {
    slug: "suspension-and-steering",
    code: "TR-09",
    name: "Suspension & Steering",
    category: "Chassis & Brakes",
    summary:
      "Shock absorbers, bushings, ball joints, tie rods and steering racks — the fix for knocking noises, wandering steering and uneven tyre wear.",
    benefits: [
      "Comfortable, stable ride restored",
      "Stops uneven tyre wear that costs you money",
      "Safer handling in wet-season conditions",
    ],
    process: [
      "Ramp inspection of all suspension and steering joints",
      "Identify worn components with you present if you wish",
      "Replace parts and torque to specification",
      "Road test and alignment recommendation",
    ],
    duration: "2 hours – 1 day",
  },
  {
    slug: "timing-belt-and-chain",
    code: "TR-10",
    name: "Timing Belt & Chain",
    category: "Engine & Drivetrain",
    summary:
      "Scheduled timing belt and chain replacement with tensioners and water pump where fitted — the single most important preventive job on many engines.",
    benefits: [
      "Prevents catastrophic engine damage from belt failure",
      "Tensioners and pump done together to avoid repeat labour",
      "Peace of mind for high-mileage vehicles",
    ],
    process: [
      "Check service history against the replacement interval",
      "Replace belt or chain, tensioners and guides",
      "Replace water pump where belt-driven",
      "Verify timing and extended run test",
    ],
    duration: "1 – 2 working days",
  },
  {
    slug: "cooling-system-and-radiator",
    code: "TR-11",
    name: "Cooling System & Radiator",
    category: "Engine & Drivetrain",
    summary:
      "Radiators, hoses, thermostats, water pumps and coolant flushes — critical protection against overheating in Brunei's climate.",
    benefits: [
      "Prevents overheating damage in tropical heat",
      "Leaks found with pressure testing, not guesswork",
      "Correct coolant type and mixture every time",
    ],
    process: [
      "Pressure test to locate leaks",
      "Replace faulty components",
      "System flush and refill with correct coolant",
      "Bleed air and verify operating temperature",
    ],
    duration: "2 hours – 1 day",
  },
  {
    slug: "battery-replacement",
    code: "TR-12",
    name: "Battery Replacement",
    category: "Servicing",
    summary:
      "Battery testing and replacement with correctly sized units, plus charging-system checks so a weak alternator doesn't kill the new battery.",
    benefits: [
      "No more morning no-starts",
      "Charging system verified with the new battery",
      "Old battery disposed of responsibly",
    ],
    process: [
      "Test battery health and charging voltage",
      "Fit correctly rated replacement",
      "Clean terminals and secure mounting",
      "Verify charging output",
    ],
    duration: "30 – 45 minutes",
  },
  {
    slug: "alternator-and-starter",
    code: "TR-13",
    name: "Alternator & Starter Motor",
    category: "Servicing",
    summary:
      "Testing, repair and replacement of alternators and starter motors — the usual culprits behind flat batteries and clicking no-starts.",
    benefits: [
      "Root cause found before parts are replaced",
      "Quality replacement units that last",
      "Charging output verified after the job",
    ],
    process: [
      "Test starter draw and alternator output",
      "Confirm the faulty unit",
      "Replace and verify belt tension",
      "Full charging and starting test",
    ],
    duration: "2 – 5 hours",
  },
  {
    slug: "general-inspection",
    code: "TR-14",
    name: "General Inspection",
    category: "Inspection & Fleet",
    summary:
      "A structured multi-point health check of brakes, suspension, fluids, tyres and drivetrain, with a clear written summary of what needs attention now, soon, or not at all.",
    benefits: [
      "Know your vehicle's true condition",
      "Prioritised list — urgent, upcoming, fine",
      "No pressure: the report is yours to act on",
    ],
    process: [
      "Road test and ramp inspection",
      "Multi-point checklist across all major systems",
      "Photos of any findings",
      "Written summary with honest priorities",
    ],
    duration: "About 1 hour",
  },
  {
    slug: "pre-purchase-inspection",
    code: "TR-15",
    name: "Pre-Purchase Inspection",
    category: "Inspection & Fleet",
    summary:
      "An independent inspection before you buy a used car — hidden accident repairs, engine condition and upcoming costs uncovered before you commit.",
    benefits: [
      "Negotiating power backed by evidence",
      "Avoid cars with hidden expensive problems",
      "Independent — we have no stake in the sale",
    ],
    process: [
      "Body and structure check for accident history",
      "Engine, gearbox and drivetrain assessment",
      "Ramp inspection of brakes and suspension",
      "Verbal debrief plus written findings",
    ],
    duration: "1 – 1.5 hours",
  },
  {
    slug: "fleet-maintenance",
    code: "TR-16",
    name: "Fleet Maintenance",
    category: "Inspection & Fleet",
    summary:
      "Scheduled servicing and repair programmes for company vehicles — priority booking, consolidated invoicing and a dedicated contact for your fleet.",
    benefits: [
      "Less vehicle downtime for your business",
      "One monthly invoice instead of scattered receipts",
      "A single contact who knows your vehicles",
    ],
    process: [
      "Fleet assessment and maintenance schedule",
      "Priority booking slots for your vehicles",
      "Service records kept per vehicle",
      "Monthly report and consolidated invoice",
    ],
    duration: "Ongoing programme",
  },
];

export const serviceCategories = [
  "Servicing",
  "Engine & Drivetrain",
  "Chassis & Brakes",
  "Inspection & Fleet",
] as const;
