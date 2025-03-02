import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Bell, LogOut, Menu, User } from 'lucide-react';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from './components/ui/button';
import TShirtSelection from './pages/components/TShirtSelection';
import { HeaderAdmin } from './pages/admin/HeaderAdmin';

export const handleLogout = () => {
  localStorage.removeItem('isLoginMallengke');
  localStorage.removeItem('clientName');
  localStorage.removeItem('userRole');

  window.location.href = '/login';
};

function App() {
  const path = useLocation().pathname;
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="bg-[#D9D9D9] bg-center w-full min-h-screen flex flex-col">
      <HeaderAdmin
        handleLogout={handleLogout}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div className="flex w-full">
        {showSidebar && (
          <aside className="w-[16rem] bg-transparent  flex flex-col text-start  min-h-screen justify-center">
            <nav className="flex flex-col  text-xl bg-white border-2 p-4 h-[80%] mt-[-5rem] rounded-r-2xl shadow-xl">
              <Link
                className="font-semibold bg-[#74AB6E] p-2 rounded-lg text-white mb-2"
                to="/"
              >
                Home
              </Link>
              <Link
                className="font-semibold bg-[#74AB6E] p-2 rounded-lg text-white mb-2"
                to="/reports"
              >
                Reports
              </Link>
              <Link
                className="font-semibold bg-[#74AB6E] p-2 rounded-lg text-white mb-2"
                to="/create-design"
              >
                Create Design
              </Link>
              <Link
                className="font-semibold bg-[#74AB6E] p-2 rounded-lg text-white mb-2"
                to="/saved-designs"
              >
                Saved Designs
              </Link>
              <Link
                className="font-semibold bg-[#74AB6E] p-2 rounded-lg text-white mb-2"
                to="/orders"
              >
                Orders
              </Link>
            </nav>
          </aside>
        )}

        <main className="flex-grow min-h-screen">
          {path === '/' ? (
            <div className="min-h-screen ">
              <div className=" py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                      Start your Design now!
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                      Create your unique custom t-shirt design with our
                      easy-to-use tool. Choose from our premium quality shirts
                      and bring your ideas to life.
                    </p>
                  </div>
                </div>
              </div>
              <main>
                <TShirtSelection />
              </main>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
