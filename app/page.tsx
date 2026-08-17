import { Automation } from '@/components/AutomationSection';
import { Faq } from '@/components/FaqSection';
import { Features } from '@/components/FeatureSection';
import { FinalCta } from '@/components/FinalCtaSection';
import { Hero } from '@/components/HeroSection';
import { LeadForm } from '@/components/LeadSection';
import { Pricing } from '@/components/PricingSection';
import Problems from '@/components/ProblemSection';
import { Realtime } from '@/components/RealtimeSection';
import { Security } from '@/components/SecuritySection';
import { Services } from '@/components/ServiceSection';
import { Testimonials } from '@/components/TestimonialSection';
import { Workflow } from '@/components/WorkflowSection';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Problems />
      <Workflow />
      <LeadForm />
      <Features />
      <Automation />
      <Realtime />
      <Security />
      <Pricing />
      <Services />
      <Testimonials />
      <Faq />
      <FinalCta />
    </div>
  )
}

export default HomePage;