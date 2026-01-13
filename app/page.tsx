import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import CustomerReviews from "@/components/customer-reviews"
import BundleOptions from "@/components/bundle-options"
import OrderForm from "@/components/order-form"

export const metadata = {
  title: "Spin Scrubber - Fast & Effortless Cleaning | Free Delivery in Accra",
  description:
    "Revolutionary spin scrubber with cordless convenience. 5000mAh battery, 3-4 hour fast charging. Free delivery & payment on delivery in Accra, Ghana.",
}

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <FeaturesSection />
      <CustomerReviews />
      <BundleOptions />
      <OrderForm />
    </main>
  )
}
