"use client";

import SceneShell from "./SceneShell";
import OilScene, { OIL_STEPS } from "./OilScene";
import BrakeScene, { BRAKE_STEPS } from "./BrakeScene";
import SuspensionScene, { SUSPENSION_STEPS } from "./SuspensionScene";
import MountScene, { MOUNT_STEPS } from "./MountScene";
import ClutchScene, { CLUTCH_STEPS } from "./ClutchScene";
import TimingScene, { TIMING_STEPS } from "./TimingScene";

const registry = {
  oil: { steps: OIL_STEPS, badge: "Engine Protected", Scene: OilScene },
  brakes: { steps: BRAKE_STEPS, badge: "Safe Braking Restored", Scene: BrakeScene },
  suspension: { steps: SUSPENSION_STEPS, badge: "Ride Restored", Scene: SuspensionScene },
  mounts: { steps: MOUNT_STEPS, badge: "Cabin Stable", Scene: MountScene },
  clutch: { steps: CLUTCH_STEPS, badge: "Full Power Transfer", Scene: ClutchScene },
  timing: { steps: TIMING_STEPS, badge: "Perfect Timing", Scene: TimingScene },
} as const;

export type SceneKey = keyof typeof registry;

/** Drop-in interactive repair experience for any scene key. */
export default function RepairExperience({ sceneKey, autoPlay = true }: { sceneKey: SceneKey; autoPlay?: boolean }) {
  const { steps, badge, Scene } = registry[sceneKey];
  return <SceneShell steps={[...steps]} badge={badge} autoPlay={autoPlay} render={(step) => <Scene step={step} />} />;
}
