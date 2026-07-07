import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { posts } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <article className="border-b border-steel">
        <div className="wrap max-w-3xl pb-20 pt-32 sm:pt-40">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-fog transition-colors hover:text-paper">
              <ArrowLeft size={15} aria-hidden /> All articles
            </Link>
            <p className="eyebrow mt-8">
              {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.readMinutes} min read
            </p>
            <h1 className="h-display mt-4 text-3xl leading-tight sm:text-4xl">{post.title}</h1>
            <div className="mt-8 space-y-5 leading-relaxed text-fog">
              {post.body.map((para, i) => (
                <p key={i} className="text-[15px] sm:text-base">{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </article>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </>
  );
}
