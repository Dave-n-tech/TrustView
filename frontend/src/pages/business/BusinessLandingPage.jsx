import { Link } from "react-router-dom"

export const BusinessLandingPage = () => {
  return (
    <>
      <section className="container mx-auto mb-3 mt-3 p-4">
        <div className="w-full flex flex-col space-y-4 py-8 items-center justify-center">
          <h1 className="max-w-3xl text-4xl text-PrimaryBlue font-bold text-center md:text-5xl">Manage Reviews, Build Trust, Grow Your Brand</h1>
          <p className="max-w-lg text-center text-gray-800">Harness the power of reviews to strengthen relationships, improve services, and boost your reputation—all from one easy-to-use platform.</p>
          <Link to={"/register/business"}>
            <button className="bg-PrimaryBlue text-white text-sm w-36 h-10 rounded-md">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
