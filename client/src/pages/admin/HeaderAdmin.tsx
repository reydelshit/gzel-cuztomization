import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Bell, LogOut, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderAdminProps {
  handleLogout: () => void;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export function HeaderAdmin({
  handleLogout,
  showSidebar,
  setShowSidebar,
}: HeaderAdminProps) {
  return (
    <header className="bg-white h-20 flex justify-between items-center w-full px-6 shadow-xl">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-gray-600 hover:text-gray-900"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <Link
          to="/"
          className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors"
        >
          GZEL Digital Design and Printing
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col space-y-2">
              <NotificationItem name="John Doe" />
              <NotificationItem name="Jane Smith" />
              <NotificationItem name="Bob Johnson" />
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Admin</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-4 py-2 text-left rounded-md hover:bg-gray-100 transition-colors text-red-600 hover:text-red-800"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}

function NotificationItem({ name }: { name: string }) {
  return (
    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
      <span>
        New Order from <strong>{name}</strong>
      </span>
    </div>
  );
}
