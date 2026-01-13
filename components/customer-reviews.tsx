"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"

const reviews = [
  {
    name: "Ama K.",
    location: "Accra",
    rating: 5,
    text: "This spin scrubber changed my life! Cleaning my bathroom used to take hours, now it's done in minutes. Best investment ever!",
    image: "/images/customer-review-1.png",
    productShown: "Complete Bundle",
  },
  {
    name: "Kwesi M.",
    location: "Kumasi",
    rating: 5,
    text: "The quality is amazing! My kitchen tiles look brand new. The different brush heads make it perfect for every surface in my home.",
    image: "/images/customer-review-2.png",
    productShown: "Multi-Head Bundle",
  },
  {
    name: "Gifty N.",
    location: "Takoradi",
    rating: 5,
    text: "Fast delivery, amazing product. My walls have never been cleaner! Highly recommend to anyone who wants a spotless home.",
    image: "/images/customer-review-3.png",
    productShown: "Starter Pack",
  },
]

export default function CustomerReviews() {
  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4">Loved Across Ghana</h2>
          <p className="text-base md:text-xl text-slate-600">
            See what real customers are saying about their spin scrubbers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12 md:mb-16">
          {reviews.map((review, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              {/* Product Image */}
              <div className="relative w-full aspect-square bg-slate-200 overflow-hidden">
                <Image
                  src={review.image || "/placeholder.svg"}
                  alt={`${review.name}'s purchase - ${review.productShown}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Review Content */}
              <div className="p-4 md:p-6 flex flex-col flex-1">
                {/* Star Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-sm md:text-base text-slate-700 mb-4 italic flex-1">"{review.text}"</p>

                <div className="border-t pt-4">
                  <p className="font-semibold text-slate-900 text-sm md:text-base">{review.name}</p>
                  <p className="text-xs md:text-sm text-slate-600">{review.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Signal */}
        <div className="bg-white rounded-lg p-6 md:p-8 text-center max-w-2xl mx-auto border border-slate-200">
          <p className="text-base md:text-lg text-slate-700">
            <span className="font-bold text-blue-600">2000+</span> happy customers in Ghana trust our spin scrubber for
            their cleaning needs
          </p>
        </div>
      </div>
    </section>
  )
}
