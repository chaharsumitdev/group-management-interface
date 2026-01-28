import {
  LayoutDashboard,
  MessageCircle,
  Users,
  Contact,
  ClipboardList,
  Folder,
  Settings,
  ChevronsUpDown,
} from "lucide-react";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: string;
  active?: boolean;
};

const nav: NavItem[] = [
  { label: "Dashboard", href: "#", icon: LayoutDashboard },
  { label: "Chats", href: "#", icon: MessageCircle, badge: "36+" },
  { label: "Groups", href: "/", icon: Users, active: true },
  { label: "Contacts", href: "#", icon: Contact },
  { label: "Logs", href: "#", icon: ClipboardList },
  { label: "Files", href: "#", icon: Folder },
  { label: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
  return (
    <aside
      className="flex h-full w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white"
      aria-label="Primary navigation"
    >
      <div className="flex h-full flex-col gap-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-green-800">
              CH
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-gray-900">Periskope</h1>
              <p className="text-sm text-gray-500 wrap-anywhere">chahar.sumit888@gmail.com</p>
            </div>
          </div>
          <button type="button" className="text-gray-400 hover:text-gray-600 hover:cursor-pointer">
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" aria-hidden />
                <span className="flex-1">{item.label}</span>
                {item.badge != null && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-gray-200 pt-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Help &amp; Support
          </a>
        </div>
      </div>
    </aside>
  );
}
