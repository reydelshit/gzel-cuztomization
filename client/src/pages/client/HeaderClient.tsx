import { Bell, User, LogOut } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeaderClientProps {
  clientName: string;
  handleLogout: () => void;
}

export function HeaderClient({ clientName, handleLogout }: HeaderClientProps) {
  return (
    <header className="bg-white h-16 flex justify-between items-center w-full px-6 shadow-md">
      <div className="flex items-center space-x-2">
        <Link
          to="/client"
          className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors"
        >
          GZEL Digital Design and Printing
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <Link
          to="/client/suggestions"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Suggestions
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
              <span>{clientName}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="flex flex-col space-y-2">
              <Link
                to="/client/saved-designs"
                className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span>Saved Designs</span>
              </Link>
              <Separator />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors text-red-600 hover:text-red-800"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
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
