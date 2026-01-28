import Link from "next/link";
import { BadgeHelp, Bell, UsersRound } from "lucide-react";

export function Header() {
  const isPhoneOnline = true;

  return (
    <header className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center gap-2 text-black">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
          <UsersRound className="h-5 w-5" aria-hidden />
        </span>
        <h2 className="text-xl font-semibold text-gray-900">groups</h2>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="#"
          className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <BadgeHelp className="h-4 w-4" aria-hidden />
          Docs
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          aria-label={isPhoneOnline ? "Phone online" : "Phone offline"}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${isPhoneOnline ? "bg-green-500 shadow-[0px_1px_8px_2px_rgb(27_235_32)]" : "bg-red-500 shadow-[0px_1px_8px_2px_rgb(239_68_68)]"
              }`}
          />
          <span>+91 90043 89372</span>
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </header>
  );
}
