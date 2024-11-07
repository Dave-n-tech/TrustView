
export const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6 mt-12 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TrustView. All Rights Reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-PrimaryBlue transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-PrimaryBlue transition-colors duration-300">Terms of Service</a>
          <a href="#" className="hover:text-PrimaryBlue transition-colors duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}
