import Reveal from "./Reveal";

type Props = { eyebrow: string; title: string; lead?: string };

/** Consistent header block used at the top of every inner page. */
export default function PageHeader({ eyebrow, title, lead }: Props) {
  return (
    <section className="border-b border-steel pb-14 pt-32 sm:pt-40">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h-display mt-4 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
          {lead ? <p className="mt-5 max-w-2xl leading-relaxed text-fog">{lead}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
