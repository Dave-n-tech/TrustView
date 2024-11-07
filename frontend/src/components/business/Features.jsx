
export const Features = () => {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-semibold text-center mb-8 text-PrimaryBlue">
        Why TrustView for Your Business?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border-t-4 border-PrimaryBlue transition-all duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-PrimaryBlue">
            Centralized Review Management
          </h3>
          <p className="text-gray-600 mt-3">
            Easily view and manage all reviews in one place, whether they’re
            from customers you’ve invited or visitors to your business profile.
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border-t-4 border-PrimaryBlue transition-all duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-PrimaryBlue">
            Build Customer Trust
          </h3>
          <p className="text-gray-600 mt-3">
            Respond to reviews and show your dedication to quality service,
            helping build trust with your current and future customers.
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border-t-4 border-PrimaryBlue transition-all duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-PrimaryBlue">
            Email Invitations for Reviews
          </h3>
          <p className="text-gray-600 mt-3">
            Invite customers to leave reviews and gather feedback with a few
            clicks, improving engagement and building credibility.
          </p>
        </div>
      </div>
    </section>
  );
};
