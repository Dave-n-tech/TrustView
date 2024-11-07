import { Features } from "../../components/business/Features";
import { Hero } from "../../components/business/Hero";
import { HowItWorks } from "../../components/business/HowItWorks";

export const BusinessLandingPage = () => {
  return (
    <div className="container mx-auto mb-3 mt-3 p-4">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};
