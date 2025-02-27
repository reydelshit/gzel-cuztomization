import { Link, Outlet, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Button } from './components/ui/button';
import { Bell, LogOut, User } from 'lucide-react';
import TShirtSelection from './pages/components/2DTShirtSelection';
import { useState } from 'react';

function App() {
  const path = useLocation().pathname;
  const [showSidebar, setShowSidebar] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('isLoginMallengke');
    window.location.href = '/login';
  };
  return (
    <div className="bg-[#FFF5ED] bg-center w-full min-h-screen h-full flex items-center flex-col ">
      <div className="w-full text-center h-full">
        <header className="bg-white h-[5rem] flex justify-between items-center w-full p-4 shadow-xl">
          <div className="flex gap-2 items-center ">
            <Button
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            >
              {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
            </Button>
            <h1>GZEL Digital Design and Printing</h1>
          </div>

          <div className="flex gap-4">
            <Bell />
            <span className="flex gap-2">
              <User />
              Admin
            </span>
          </div>
        </header>

        <div className="flex w-full h-full">
          {showSidebar && (
            <div className="w-[16rem] bg-[#272626] text-[#fff6f2] flex flex-col text-start p-8 h-screen">
              <div className="flex flex-col mt-[2rem] text-xl">
                <Link className="font-semibold" to="/">
                  Home
                </Link>
                <Link className="font-semibold" to="/reports">
                  Reports
                </Link>

                <Link className="font-semibold" to="/create-design">
                  Create Design
                </Link>

                <Link className="font-semibold" to="/orders">
                  Orders
                </Link>
              </div>
            </div>
          )}

          <div className="h-screen w-full ">
            {path === '/' ? (
              <div className="w-full border-2 h-full flex flex-col gap-8">
                <div className="h-[150px] flex flex-col items-center justify-center">
                  <h1 className="text-4xl font-bold">
                    Starts your Design now!
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptates.
                  </p>
                </div>

                <TShirtSelection />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
