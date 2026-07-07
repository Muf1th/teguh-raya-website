"use client";

import { MessageCircle } from "lucide-react";
import { waLink, defaultWaMessage } from "@/lib/site";

/** Floating WhatsApp button, visible on every page. */
export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(defaultWaMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Teguh Raya Workshop on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle size={26} aria-hidden />
    </a>
  );
}
