"use client"

import { useState } from "react"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import CustomerReviews from "@/components/customer-reviews"
import BundleOptions from "@/components/bundle-options"
import OrderForm from "@/components/order-form"

export default function HomeContent() {
  const [selectedUnits, setSelectedUnits] = useState(1)

  return (
    <main className="w-full">
      <HeroSection />
      <FeaturesSection />
      <CustomerReviews />
      <BundleOptions selectedUnits={selectedUnits} onSelectUnits={setSelectedUnits} />
      <OrderForm selectedUnits={selectedUnits} onUnitsChange={setSelectedUnits} />
    </main>
  )
}
