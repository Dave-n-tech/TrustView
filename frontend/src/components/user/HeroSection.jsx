import heroImage from "../../assets/heroImage.jpg"

export const HeroSection = () => {
  return (
    <section className="container flex flex-col md:flex-row items-start mx-auto mt-4 mb-3 px-3 space-y-0 md:space-x-2 ">
      <div className="flex flex-col items-center md:items-start mb-10  space-y-6 py-8 md:w-1/2">
        <h1 className="max-w-md text-4xl text-PrimaryBlue font-bold text-center md:text-5xl md:text-left">
          Leave a review, Make an impact
        </h1>
        <p className="max-w-sm text-center text-gray-800 md:text-left">
          Join thousands of customers who are shaping better experiences.
          Whether positive or constructive, your opinion drives change and
          innovation.
        </p>
        <div className="flex justify-center md:justify-start">
          <a
            href="/submit-review"
            className="bg-PrimaryBlue text-white text-center py-2 text-sm w-36 h-10 rounded-md"
          >
            Write a Review
          </a>
        </div>
      </div>

      <div className="mb-10 md:w-1/2 h-full py-8">
        <img src={heroImage} alt="" className="w-full" />
      </div>
    </section>
  );
};
