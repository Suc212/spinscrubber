"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white pt-12 pb-12 md:pt-16 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-center min-h-[auto] md:min-h-[80vh]">
          {/* Product Image - appears first on mobile */}
          <div className="flex justify-center items-center w-full md:w-1/2">
            <div className="relative w-full max-w-sm aspect-square">
              <Image
                src="/images/screenshot-2024-12-31-105644.png"
                alt="Spin Scrubber with accessories"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center w-full md:w-1/2">
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <p className="text-xs md:text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  Revolutionary Cleaning Technology
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                  Clean <span className="text-blue-600">Effortlessly</span>
                </h1>
              </div>

              <p className="text-base md:text-xl text-slate-600 leading-relaxed max-w-md">
                Experience the power of intelligent scrubbing. 5000mAh rechargeable battery, 90-minute runtime, and 70dB
                whisper-quiet operation.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2 md:pt-4">
                <Button
                  size="lg"
                  onClick={scrollToOrder}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-12 md:h-14 text-sm md:text-base w-full sm:w-auto"
                >
                  Order Now - Free Delivery
                </Button>
              </div>

              <div className="flex flex-col gap-4 md:gap-8 pt-4 md:pt-6 md:flex-row">
                <div className="space-y-1">
                  <p className="text-xl md:text-2xl font-bold text-slate-900">GH₵800</p>
                  <p className="text-xs md:text-sm text-slate-500">Starting price</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl md:text-2xl font-bold text-slate-900">✓</p>
                  <p className="text-xs md:text-sm text-slate-500">Free delivery in Ghana</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl md:text-2xl font-bold text-slate-900">✓</p>
                  <p className="text-xs md:text-sm text-slate-500">Pay on delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
