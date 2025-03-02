import { handleLogout } from '@/App';
import { HeaderClient } from '@/pages/client/HeaderClient';
import TShirtSelection from '@/pages/components/TShirtSelection';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const ClientRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const clientName = localStorage.getItem('clientName') || '';

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
    <div className="bg-[#D9D9D9]">
      <HeaderClient clientName={clientName} handleLogout={handleLogout} />

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
