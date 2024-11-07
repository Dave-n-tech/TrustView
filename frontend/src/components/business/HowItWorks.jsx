import React from "react";

export const HowItWorks = () => {
  return (
    <section className="my-16 py-8 bg-gray-200">
      <h2 className="text-3xl font-semibold text-center mb-6 text-PrimaryBlue">How It Works</h2>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-6">
        
        <div className="flex flex-col items-center text-center space-y-2 w-64">
          <h3 className="text-lg font-bold">1. Register Your Business</h3>
          <p className="text-gray-600">
            Create an account and set up your business profile to get started
            with TrustView.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center space-y-2 w-64">
          <h3 className="text-lg font-bold">2. Invite Customers</h3>
          <p className="text-gray-600">
            Send invitations to customers to leave a review, or allow them to
            find and review your business independently.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center space-y-2 w-64">
          <h3 className="text-lg font-bold">3. Engage & Respond</h3>
          <p className="text-gray-600">
            Respond to reviews, track customer sentiment, and continuously
            improve based on feedback.
          </p>
        </div>
      </div>
    </section>
  );
};
