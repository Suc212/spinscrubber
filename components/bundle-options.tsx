"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const bundles = [
  {
    units: 1,
    price: 800,
    originalPrice: 800,
    saving: 0,
    description: "Single unit",
    highlighted: false,
  },
  {
    units: 2,
    price: 1400,
    originalPrice: 1600,
    saving: 200,
    description: "Save GH₵200",
    highlighted: true,
  },
  {
    units: 3,
    price: 2000,
    originalPrice: 2400,
    saving: 400,
    description: "Save GH₵400",
    highlighted: false,
  },
]

type BundleOptionsProps = {
  selectedUnits?: number
  onSelectUnits?: (units: number) => void
}

export default function BundleOptions({ selectedUnits, onSelectUnits }: BundleOptionsProps) {
  const scrollToOrder = (units: number) => {
    onSelectUnits?.(units)
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">
            Save More With Bundles
          </h2>
          <p className="text-base md:text-xl text-slate-600">Order multiple units and unlock exclusive savings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-12 md:mb-16">
          {bundles.map((bundle) => (
            <Card
              key={bundle.units}
              className={`relative p-6 md:p-8 flex flex-col transition-all ${
                bundle.highlighted ? "ring-2 ring-slate-500 shadow-xl md:scale-105" : ""
              } ${selectedUnits === bundle.units ? "ring-2 ring-blue-500" : ""}`}
            >
              {bundle.highlighted && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-600">
                  Most Popular
                </Badge>
              )}

              <div className="text-center flex-1">
                <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{bundle.units}</p>
                <p className="text-xs md:text-sm text-slate-600 mb-4">{bundle.units === 1 ? "Unit" : "Units"}</p>

                <div className="my-4 md:my-6 space-y-2">
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">GH₵{bundle.price.toLocaleString()}</p>
                  {bundle.saving > 0 && (
                    <p className="text-xs md:text-sm text-green-600 font-semibold">{bundle.description}</p>
                  )}
                </div>

                <p className="text-xs text-slate-500 line-through mb-4 md:mb-6">
                  {bundle.originalPrice !== bundle.price && `GH₵${bundle.originalPrice.toLocaleString()}`}
                </p>
              </div>

              <Button
                onClick={() => scrollToOrder(bundle.units)}
                className={`w-full h-10 md:h-11 text-sm md:text-base ${
                  bundle.highlighted
                    ? "bg-slate-700 hover:bg-slate-800 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                }`}
              >
                Choose This
              </Button>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 md:p-8 max-w-2xl mx-auto border border-slate-200">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">✓ Why Order Today?</h3>
          <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-slate-600">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
              <span>Free delivery in Ghana</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
              <span>Pay securely on delivery - no upfront payment required</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
              <span>Fast processing - receive within 1-2 business days</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
              <span>Bundle discounts available on multiple units</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
