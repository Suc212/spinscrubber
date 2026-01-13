"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"

const features = [
  {
    icon: "✨",
    title: "Effortless Cleaning",
    description: "Say goodbye to back-breaking scrubbing. Spend less time cleaning, more time living.",
  },
  {
    icon: "🏡",
    title: "Sparkling Clean Surfaces",
    description: "Professional-grade results without the hassle. Your home deserves to shine.",
  },
  {
    icon: "⏰",
    title: "Save 5+ Hours Weekly",
    description: "Cut your cleaning time in half and reclaim your weekends for what matters.",
  },
  {
    icon: "💪",
    title: "Zero Physical Strain",
    description: "No more wrist pain or exhaustion. Clean with ease, not effort.",
  },
  {
    icon: "🎉",
    title: "Impress Your Guests",
    description: "A spotlessly clean home that makes you proud to welcome friends and family.",
  },
  {
    icon: "💰",
    title: "Long-Term Savings",
    description: "Durable quality means fewer replacements. Invest once, enjoy for years.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
            Why Choose Our Spin Scrubber?
          </h2>
          <p className="text-base md:text-xl text-slate-600">Transform your cleaning routine and reclaim your time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-4 md:p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">{feature.icon}</div>
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Feature Image */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl aspect-auto">
            <Image
              src="/images/screenshot-2024-12-31-105716.png"
              alt="Spin Scrubber features and specifications"
              width={600}
              height={400}
              className="object-contain w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
