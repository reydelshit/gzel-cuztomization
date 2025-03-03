import { Bell, User, LogOut } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

interface HeaderClientProps {
  clientName: string;
  handleLogout: () => void;
}

type NotificationsType = {
  notif_id: number;
  title: string;
  message: string;
  receiver_id: number;
};

export function HeaderClient({ clientName, handleLogout }: HeaderClientProps) {
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);
  const userID = parseInt(localStorage.getItem('userID') || '0', 10);

  const fetchNotif = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/notif`);
      console.log(res.data);

      setNotifications(
        res.data.filter(
          (notif: NotificationsType) => notif.receiver_id === userID,
        ),
      );

      console.log(res.data, 'Notifications fetched');
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  }, []);

  useEffect(() => {
    fetchNotif();
  }, [fetchNotif]);
  return (
    <header className="bg-white h-20  flex justify-between items-center w-full px-6 shadow-md">
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
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="text-lg font-semibold">Notifications</h4>
            </div>
            <div className="flex flex-col space-y-2">
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className="text-xs text-gray-500">{notif.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">
                  No new notifications
                </p>
              )}
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
                to="/client"
                className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span>Create Design</span>
              </Link>

              <Link
                to="/client/saved-designs"
                className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span>Saved Designs</span>
              </Link>

              <Link
                to="/client/purchases"
                className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span>Purchases</span>
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
