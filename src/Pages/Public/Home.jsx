import Navbar from "@/components/Public/landing/navbar";
import HeroSection from "@/components/Public/landing/hero-section";
import FeaturesSection from "@/components/Public/landing/features-section";
import PricingSection from "@/components/Public/landing/pricing-section";
import TestimonialsSection from "@/components/Public/landing/testimonials-section";
import Footer from "@/components/Public/landing/footer";
import WhatsAppButton from "@/components/Public/landing/whatsapp-button";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;