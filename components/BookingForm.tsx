"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { services } from "@/lib/services";
import { site, waLink } from "@/lib/site";

type BookingFields = {
  name: string;
  phone: string;
  email: string;
  make: string;
  model: string;
  year: string;
  service: string;
  date: string;
  time: string;
  description: string;
};

const inputCls =
  "w-full rounded-xl border border-steel bg-ink px-4 py-3 text-sm text-paper placeholder:text-steel focus:border-accent focus:outline-none";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-fog";
const errCls = "mt-1 text-xs text-accent";

/**
 * Booking form that opens WhatsApp with a pre-filled professional message.
 * When you're ready for a backend later, POST the same `data` object to an
 * API route instead — the form needs no other changes.
 */
export default function BookingForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFields>();

  const onSubmit = (data: BookingFields) => {
    const message = [
      "Hello, I would like to book a service.",
      "",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      data.email ? `Email: ${data.email}` : "",
      `Vehicle: ${data.make} ${data.model} (${data.year})`,
      `Service: ${data.service}`,
      `Preferred Date: ${data.date}`,
      `Preferred Time: ${data.time}`,
      data.description ? `Problem: ${data.description}` : "",
      "",
      "Please confirm availability. Thank you.",
    ]
      .filter((line) => line !== "")
      .join("\n");

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card p-8 text-center sm:p-12">
        <CheckCircle2 size={40} className="mx-auto text-accent" aria-hidden />
        <h2 className="h-display mt-4 text-2xl">Almost done — send the WhatsApp message</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fog">
          A WhatsApp chat has opened with your booking details filled in. Press send
          and we will confirm your slot during working hours. If the chat did not open,
          message us directly at {site.phoneDisplay}.
        </p>
        <button onClick={() => setSent(false)} className="btn-ghost mt-6">
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card grid gap-5 p-6 sm:grid-cols-2 sm:p-10" noValidate>
      <div>
        <label htmlFor="bk-name" className={labelCls}>Full name *</label>
        <input id="bk-name" className={inputCls} placeholder="Your name"
          {...register("name", { required: "Please enter your name" })} />
        {errors.name && <p role="alert" className={errCls}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="bk-phone" className={labelCls}>Phone number *</label>
        <input id="bk-phone" type="tel" className={inputCls} placeholder="+673 …"
          {...register("phone", { required: "Please enter a phone number" })} />
        {errors.phone && <p role="alert" className={errCls}>{errors.phone.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="bk-email" className={labelCls}>Email (optional)</label>
        <input id="bk-email" type="email" className={inputCls} placeholder="you@example.com"
          {...register("email", {
            pattern: { value: /^\S+@\S+\.\S+$/, message: "That email doesn't look right" },
          })} />
        {errors.email && <p role="alert" className={errCls}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="bk-make" className={labelCls}>Vehicle make *</label>
        <input id="bk-make" className={inputCls} placeholder="e.g. Toyota"
          {...register("make", { required: "Vehicle make is required" })} />
        {errors.make && <p role="alert" className={errCls}>{errors.make.message}</p>}
      </div>

      <div>
        <label htmlFor="bk-model" className={labelCls}>Vehicle model *</label>
        <input id="bk-model" className={inputCls} placeholder="e.g. Hilux"
          {...register("model", { required: "Vehicle model is required" })} />
        {errors.model && <p role="alert" className={errCls}>{errors.model.message}</p>}
      </div>

      <div>
        <label htmlFor="bk-year" className={labelCls}>Year *</label>
        <input id="bk-year" inputMode="numeric" className={inputCls} placeholder="e.g. 2019"
          {...register("year", {
            required: "Year is required",
            pattern: { value: /^(19|20)\d{2}$/, message: "Enter a 4-digit year" },
          })} />
        {errors.year && <p role="alert" className={errCls}>{errors.year.message}</p>}
      </div>

      <div>
        <label htmlFor="bk-service" className={labelCls}>Service needed *</label>
        <select id="bk-service" className={inputCls} defaultValue=""
          {...register("service", { required: "Please choose a service" })}>
          <option value="" disabled>Choose a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
          <option value="Not sure — please advise">Not sure — please advise</option>
        </select>
        {errors.service && <p role="alert" className={errCls}>{errors.service.message}</p>}
      </div>

      <div>
        <label htmlFor="bk-date" className={labelCls}>Preferred date *</label>
        <input id="bk-date" type="date" className={inputCls}
          {...register("date", { required: "Pick a preferred date" })} />
        {errors.date && <p role="alert" className={errCls}>{errors.date.message}</p>}
      </div>

      <div>
        <label htmlFor="bk-time" className={labelCls}>Preferred time *</label>
        <select id="bk-time" className={inputCls} defaultValue=""
          {...register("time", { required: "Pick a preferred time" })}>
          <option value="" disabled>Choose a time…</option>
          {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.time && <p role="alert" className={errCls}>{errors.time.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="bk-desc" className={labelCls}>Describe the problem (optional)</label>
        <textarea id="bk-desc" rows={4} className={inputCls}
          placeholder="e.g. Knocking sound from the front when going over bumps"
          {...register("description")} />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Continue to WhatsApp
        </button>
        <p className="mt-3 text-xs leading-relaxed text-fog">
          Pressing this opens WhatsApp with your booking pre-filled — nothing is sent
          until you press send in WhatsApp. Prefer to call? {site.phoneDisplay}.
        </p>
      </div>
    </form>
  );
}
