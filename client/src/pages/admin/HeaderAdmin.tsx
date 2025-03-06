import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import axios from 'axios';
import { Bell, LogOut, Menu, User } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderAdminProps {
  handleLogout: () => void;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

type NotificationsType = {
  notif_id: number;
  title: string;
  message: string;
  receiver_id: number;
};

export function HeaderAdmin({
  handleLogout,
  showSidebar,
  setShowSidebar,
}: HeaderAdminProps) {
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
          KULASTIKO GRAPHICS & PRINTING SERVICES
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
