import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import TShirtSelection from '@/pages/components/TShirtSelection';
import { handleLogout } from '@/App';
import { Separator } from '@/components/ui/separator';

const ClientRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const clientName = localStorage.getItem('clientName');

  useEffect(() => {
    const isLoginMallengke =
      localStorage.getItem('isLoginMallengke') === 'true';
    const userRole = localStorage.getItem('userRole');

    if (!isLoginMallengke || userRole !== 'client') {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <header className="bg-white h-[5rem] flex justify-between items-center w-full p-4 shadow-xl">
        <div className="flex gap-2 items-center">
          <h1>
            <Link to="/client"> GZEL Digital Design and Printing | </Link>
            <span>
              <Link to="/client/suggestions" className="underline">
                {' '}
                Suggestions
              </Link>
            </span>
          </h1>
        </div>
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger>
              <Bell />
            </PopoverTrigger>
            <PopoverContent>
              <span>
                New Order from <strong>John Doe</strong>
              </span>
              <span>
                New Order from <strong>John Doe</strong>
              </span>
              <span>
                New Order from <strong>John Doe</strong>
              </span>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>
              <span className="flex gap-2">
                <User /> {clientName}
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-4">
              <span
                className="flex gap-2 w-full items-center justify-center cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut /> Logout
              </span>

              <Separator />
              <span className="flex gap-2 w-full items-center justify-center cursor-pointer">
                <Link to="/client/saved-designs"> Saved Designs</Link>
              </span>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {location.pathname === '/client' && (
        <div className="min-h-screen">
          <div className="py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Start your Design now!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Create your unique custom t-shirt design with our easy-to-use
                tool. Choose from our premium quality shirts and bring your
                ideas to life.
              </p>
            </div>
          </div>
          <main>
            <TShirtSelection />
          </main>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default ClientRoot;
