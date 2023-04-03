import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, singOutUser } = useContext(UserContext);

  const handleClickLogOut = async () => {
    try {
      await singOutUser();
    } catch (error) {
      console.log(error);
    }
  };

  const classNameButtonBlue =
    "mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const classNameButtonRed =
    "mx-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            APPli
          </span>
        </Link>
        <div className="flex md:order-2">
          {user ? (
            <>
              <NavLink to="/" className={classNameButtonBlue}>
                Inicio
              </NavLink>
              <button
                onClick={handleClickLogOut}
                className={classNameButtonRed}
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={classNameButtonBlue}>
                Login
              </NavLink>
              <NavLink to="/register" className={classNameButtonBlue}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
