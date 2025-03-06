import { useState } from 'react';
import { ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '../context/AuthContext';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden">
      <div
        onClick={toggleMenu}
        className={
          `w-64 bg-gray-700 text-white transition-all duration-300
            ${isMenuOpen ? 'w-[500px]' : 'w-[50px]'}
          `}
      >
        <button
          onClick={toggleMenu}
          className="p-4 cursor-pointer ml-auto block"
        >
          {
            isMenuOpen
              ? <XMarkIcon className="h-6 w-6" />
              : <Bars3Icon className="h-6 w-6" />
          }
        </button>

        <nav className="flex flex-col justify-between p-4 layout-links">
          {
            isMenuOpen && (
              <ul>
                <li><a href="/page1">page 1</a></li>
                <li><a href="/page2">page 2</a></li>
                <li><a href="/page3">page 3</a></li>
              </ul>
            )
          }

          <button
            className="mt-auto flex cursor-pointer"
            onClick={() => {
              logout();
            }}
          >
            {
              isMenuOpen && "Logout"
            }
            <ArrowRightOnRectangleIcon
              className={`${isMenuOpen ? 'ml-2' : ''} h-6 w-6 h-6 min-w-6`}
            />
          </button>
        </nav>
      </div>
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  )
}
export default MainLayout;