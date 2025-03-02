import {
  Home,
  BarChart2,
  Palette,
  BookmarkIcon,
  ShoppingBag,
  LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Reports', href: '/reports', icon: BarChart2 },
  { name: 'Create Design', href: '/create-design', icon: Palette },
  { name: 'Saved Designs', href: '/saved-designs', icon: BookmarkIcon },
  { name: 'Orders', href: '/orders', icon: ShoppingBag },
];

interface SidebarItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

export function SidebarAdmin() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({ name, href, icon: Icon }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
    >
      <Icon className="h-5 w-5 text-gray-500 group-hover:text-green-600" />
      <span className="font-medium">{name}</span>
    </Link>
  );
}
