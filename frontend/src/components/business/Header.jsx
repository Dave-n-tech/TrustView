import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header className="relative container mx-auto py-2 px-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-PrimaryBlue font-bold text-2xl"> TRUSTVIEW </h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="hover:font-semibold hover:text-PrimaryBlue">For users</a>
          <a href="/invite-review" className="hover:font-semibold hover:text-PrimaryBlue">Send Review Invite</a>
          {/* if user logged in, show user name and profile icon */}
          <a href="/login" className="hover:font-semibold hover:text-PrimaryBlue"> Login </a>
          <Link to={"/register/business"}>
            <button className="bg-PrimaryBlue text-white text-sm w-36 h-10 rounded-md">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
