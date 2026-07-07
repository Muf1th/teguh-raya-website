import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
};

export default function SectionHeading({ eyebrow, title, lead }: Props) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-display mt-4 text-3xl sm:text-4xl">{title}</h2>
      {lead ? <p className="mt-4 text-base leading-relaxed text-fog">{lead}</p> : null}
    </Reveal>
  );
}
