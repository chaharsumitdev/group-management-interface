import {
  ChevronsUpDown,
} from "lucide-react";

import HomeIcon from '@mui/icons-material/Home';
import SmsIcon from '@mui/icons-material/Sms';
import GroupsIcon from '@mui/icons-material/Groups';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FolderClosedIcon from '@mui/icons-material/Folder';
import Link from "next/link";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string, style?: React.CSSProperties }>;
  badge?: string;
  active?: boolean;
};

const nav: NavItem[] = [
  { label: "Dashboard", href: "#", icon: HomeIcon },
  { label: "Chats", href: "#", icon: SmsIcon, badge: "36+" },
  { label: "Groups", href: "/", icon: GroupsIcon, active: true },
  { label: "Contacts", href: "#", icon: ContactsIcon },
  { label: "Logs", href: "#", icon: NotificationsActiveIcon },
  { label: "Files", href: "#", icon: FolderClosedIcon },
  { label: "Settings", href: "#", icon: SettingsIcon },
];

export function Sidebar() {
  return (
    <aside
      className="flex h-full w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white"
      aria-label="Primary navigation"
    >
      <div className="flex h-full flex-col gap-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <Image src="/periskope-icon.svg" alt="Periskope" width={36} height={36} />
            <div className="min-w-0">
              <h1 className="text-md font-semibold text-gray-900 leading-tight">Periskope</h1>
              <p className="text-sm text-gray-500 wrap-anywhere leading-tight">bharat@hashlabs.dev</p>
            </div>
          </div>
          <button type="button" className="text-gray-700 hover:text-gray-900 hover:cursor-pointer">
            <ChevronsUpDown className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = item.active ?? false;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${isActive
                  ? "bg-gray-100 text-green-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="w-6">
                  <Icon className="flex-shrink-0" style={{ height: 18, width: 18 }} aria-hidden />
                </span>
                <span className="flex-1 font-500">{item.label}</span>
                {item.badge != null && (
                  <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-green-400 px-1 text-xs font-medium text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto">
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="w-6">
              <Image src="/whatsapp-icon.svg" alt="Periskope" width={14} height={14} />
            </span>
            Help &amp; Support
          </a>
        </div>
      </div>
    </aside>
  );
}
