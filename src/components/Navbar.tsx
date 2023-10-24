import { useLocation } from "react-router-dom"

const Navbar = () => {

  const location = useLocation();

  const path = location.pathname
  return null;
  // if (!(path == '/' || path == '/create')) return null
  return (
    <header className="bg-gray-900 h-[4rem] w-full sticky top-0 z-[50]">
      <nav className="w-[90%] mx-auto bg-gray-900 h-full flex items-center">
        <div>
          <h3 className="text-white font-semibold text-xl underline cursor-pointer">SDCompanion</h3>
        </div>
      </nav>
    </header>
  )
}

export default Navbar