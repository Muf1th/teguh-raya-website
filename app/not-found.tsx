import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center">
      <div className="wrap py-32 text-center">
        <Wrench size={36} className="mx-auto text-accent" aria-hidden />
        <p className="eyebrow mt-6 justify-center">Error 404</p>
        <h1 className="h-display mt-4 text-4xl sm:text-5xl">This page is off the road</h1>
        <p className="mx-auto mt-4 max-w-md text-fog">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get
          you back on track.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">
            <ArrowLeft size={16} aria-hidden /> Back to home
          </Link>
          <Link href="/booking" className="btn-ghost">Book a service</Link>
        </div>
      </div>
    </section>
  );
}
