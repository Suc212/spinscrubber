"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"

type OrderFormProps = {
  selectedUnits?: number
  onUnitsChange?: (units: number) => void
}

export default function OrderForm({ selectedUnits = 1, onUnitsChange }: OrderFormProps) {
  const [units, setUnits] = useState(selectedUnits.toString())
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    units: selectedUnits.toString(),
  })

  const calculatePrice = (unitCount: number) => {
    const prices = {
      1: 800,
      2: 1400,
      3: 2000,
    }
    return prices[unitCount] || 800
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (name === "units") {
      setUnits(value)
      const parsedUnits = Number.parseInt(value)
      if (!Number.isNaN(parsedUnits)) {
        onUnitsChange?.(parsedUnits)
      }
    }
  }

  useEffect(() => {
    const nextUnits = selectedUnits.toString()
    if (nextUnits !== units) {
      setUnits(nextUnits)
      setFormData((prev) => ({ ...prev, units: nextUnits }))
    }
  }, [selectedUnits, units])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          units: Number.parseInt(formData.units),
          price: calculatePrice(Number.parseInt(formData.units)),
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit order")
      }

      setMessage({
        type: "success",
        text: "Order received! We'll contact you shortly to confirm.",
      })

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        whatsapp: "",
        address: "",
        units: "1",
      })
      setUnits("1")
      onUnitsChange?.(1)
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to submit order. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const price = calculatePrice(Number.parseInt(units))

  return (
    <section id="order-form" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-4">
              Order Your Spin Scrubber
            </h2>
            <p className="text-sm md:text-xl text-slate-600">
              Fill in your details below. No hidden charges, free delivery included.
            </p>
          </div>

          <Card className="p-6 md:p-8 border-2">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="bg-blue-50 p-4 md:p-6 rounded-lg border border-blue-200">
                <label className="block text-sm md:text-base font-semibold text-slate-900 mb-3">Number of Units</label>
                <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                  {[1, 2, 3].map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => {
                        const nextUnits = unit.toString()
                        setUnits(nextUnits)
                        setFormData((prev) => ({ ...prev, units: nextUnits }))
                        onUnitsChange?.(unit)
                      }}
                      className={`py-2 md:py-3 px-3 md:px-4 rounded-lg font-semibold text-sm md:text-base transition-all ${
                        units === unit.toString()
                          ? "bg-blue-600 text-white ring-2 ring-blue-700"
                          : "bg-white text-slate-900 border-2 border-slate-200 hover:border-blue-600"
                      }`}
                    >
                      {unit === 1 ? `${unit}` : `${unit}`}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base text-slate-600">Total Price:</span>
                  <span className="text-2xl md:text-3xl font-bold text-blue-600">GH₵{price.toLocaleString()}</span>
                </div>
              </div>

              {message.text && (
                <Alert
                  className={`text-sm md:text-base ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  {message.text}
                </Alert>
              )}

              {/* Contact Information */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="font-semibold text-sm md:text-base text-slate-900">Contact Information</h3>

                <div>
                  <label htmlFor="fullName" className="block text-xs md:text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="h-10 md:h-11 text-sm md:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs md:text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="h-10 md:h-11 text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+233 xxx xxx xxxx"
                      className="h-10 md:h-11 text-sm md:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-xs md:text-sm font-medium text-slate-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    placeholder="+233 xxx xxx xxxx"
                    className="h-10 md:h-11 text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Delivery Information */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="font-semibold text-sm md:text-base text-slate-900">Delivery Information</h3>

                <div>
                  <label htmlFor="address" className="block text-xs md:text-sm font-medium text-slate-700 mb-2">
                    Full Delivery Address *
                  </label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Street address, building name, etc."
                    className="h-10 md:h-11 text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-slate-50 p-4 md:p-6 rounded-lg space-y-3 border border-slate-200">
                <div className="flex justify-between text-sm md:text-base text-slate-600">
                  <span>
                    {Number.parseInt(units)} unit{Number.parseInt(units) > 1 ? "s" : ""} × GH₵
                    {Number.parseInt(units) === 1 ? "800" : Number.parseInt(units) === 2 ? "1400" : "2000"}
                  </span>
                  <span>GH₵{price.toLocaleString()}</span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-base md:text-lg font-bold text-slate-900">
                  <span>Total (Pay on Delivery)</span>
                  <span className="text-blue-600">GH₵{price.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 md:h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-base"
              >
                {loading ? "Processing..." : "Complete Order"}
              </Button>

              <p className="text-center text-xs md:text-sm text-slate-500">
                ✓ By ordering, you agree to pay on delivery. No payment required now.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
