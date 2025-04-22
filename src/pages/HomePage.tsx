import Navbar from '@/components/Navbar'
import CommunitySection from '@/section/community-section'
import FAQSection from '@/section/faq-section'
import FeaturesSection from '@/section/features-section'
import Footer from '@/section/footer'
import Hero from '@/section/Hero'
import PricingSection from '@/section/pricing-section'
import { TestimonialsSection } from '@/section/testimonials-section'

const HomePage = () => {
  return (
    <div>
       <Navbar />
        <Hero/>
        <FeaturesSection/>
        <CommunitySection/>
        <TestimonialsSection/>
        <PricingSection/>
        <FAQSection/>
        <Footer/>
    </div>
  )
}

export default HomePage