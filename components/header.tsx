import Link from "next/link";
import { Bell } from "lucide-react";
import GroupsIcon from '@mui/icons-material/Groups';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

export function Header() {
  const isPhoneOnline = true;

  return (
    <header className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-2">
      <div className="flex items-center gap-1 text-black">
        <span className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500">
          <GroupsIcon style={{ height: 20, width: 20 }} aria-hidden />
        </span>
        <h2 className="text-md text-gray-500">groups</h2>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="#"
          className="flex items-center gap-1 rounded-sm border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          <HelpOutlineOutlinedIcon style={{ height: 18, width: 18, color: 'gray-400' }} aria-hidden />
          Docs
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 rounded-sm border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          aria-label={isPhoneOnline ? "Phone online" : "Phone offline"}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full mr-2 ${isPhoneOnline ? "bg-green-800 shadow-[0px_1px_8px_2px_rgb(27_235_32)]" : "bg-red-500 shadow-[0px_1px_8px_2px_rgb(239_68_68)]"
              }`}
          />
          <span>+91 90043 89372</span>
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </header>
  );
}
