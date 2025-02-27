import { Link, Outlet, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Button } from './components/ui/button';
import { LogOut } from 'lucide-react';

function App() {
  const path = useLocation().pathname;

  const handleLogout = () => {
    localStorage.removeItem('isLoginMallengke');
    window.location.href = '/login';
  };
  return (
    <div className="bg-[#FFF5ED] bg-center w-full min-h-screen h-full flex items-center flex-col ">
      <div className="w-full text-center h-full">
        <div className="flex gap-4 w-full border-2 h-full">
          <div className="w-[16rem] bg-[#272626] text-[#fff6f2] h-screen fixed inset-0 flex flex-col text-start p-8">
            <Link className="font-semibold" to="/">
              <h1 className="font-bold italic text-3xl">TUPI MALLENGKE </h1>
            </Link>
            <div className="flex flex-col mt-[2rem] text-xl">
              <Link className="font-semibold" to="/">
                Dashboard
              </Link>

              <Link className="font-semibold" to="/payment">
                Payment
              </Link>

              {/* <Link to="/sms">SMS</Link> */}

              <div className="fixed bottom-5 w-full">
                <Button
                  onClick={handleLogout}
                  className="w-[12rem]"
                  variant={'secondary'}
                >
                  <LogOut size={15} /> Logout
                </Button>
              </div>
            </div>
          </div>

          <div className="ml-[18rem] h-full w-full">
            {path === '/' ? <Dashboard /> : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
