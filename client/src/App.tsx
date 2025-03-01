import { Link, Outlet, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Button } from './components/ui/button';
import { Bell, LogOut, Menu, User } from 'lucide-react';
import TShirtSelection from './pages/components/2DTShirtSelection';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function App() {
  const path = useLocation().pathname;
  const [showSidebar, setShowSidebar] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('isLoginMallengke');
    window.location.href = '/login';
  };
  return (
    <div className="bg-[#D9D9D9] bg-center w-full min-h-screen flex flex-col">
      <header className="bg-white h-[5rem] flex justify-between items-center w-full p-4 shadow-xl">
        <div className="flex gap-2 items-center">
          <Button onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <Menu /> : <Menu />}
          </Button>
          <h1>GZEL Digital Design and Printing</h1>
        </div>
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger>
              <Bell />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
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
                <User />
                Admin
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <span
                className="flex gap-2 w-full items-center justify-center cursor-pointer "
                onClick={handleLogout}
              >
                <LogOut />
                Logout
              </span>
              {/* <Button onClick={handleLogout}>
             
              </Button> */}
            </PopoverContent>
          </Popover>
        </div>
      </header>

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
            <div className="w-full flex flex-col gap-8 p-8">
              <div className="h-[150px] flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Start your Design now!</h1>
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
        </main>
      </div>
    </div>
  );
}

export default App;
