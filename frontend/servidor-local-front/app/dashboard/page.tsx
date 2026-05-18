import Image from "next/image";
import {
  CalendarDays,
  ClipboardList,
  Grid2X2,
  Settings,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Grid2X2, active: true },
  { label: "Profile", icon: User },
  { label: "Calendar", icon: CalendarDays },
  { label: "Quotations", icon: ClipboardList, badge: "3" },
];

export default function ProviderDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#080e1e]">
      <aside className="flex min-h-screen w-[320px] flex-col border-r border-[#d9e1eb] bg-white px-5 py-6">
        <div className="mb-8 flex items-center gap-3 pl-4">
          <Image
            src="/provider-avatar.png"
            alt="Bob's Handyman"
            width={56}
            height={56}
            className="rounded-full border border-[#d7dde5]"
            priority
          />
          <div>
            <h2 className="text-[21px] font-extrabold leading-6 tracking-normal">
              Bob&apos;s Handyman
            </h2>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#536782]">
              Service Provider
            </p>
          </div>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`flex h-[51px] w-full cursor-pointer items-center gap-5 rounded-[9px] px-5 text-[19px] font-semibold transition-colors ${
                item.active
                  ? "bg-[#e5f5ff] text-[#14a1e8]"
                  : "text-[#111c33] hover:bg-[#f3f7fb]"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${
                  item.active ? "text-[#14a1e8]" : "text-[#111827]"
                }`}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-auto flex h-6 min-w-6 items-center justify-center rounded-full bg-[#1ba7e9] px-2 text-sm font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="mt-auto flex h-[51px] w-full cursor-pointer items-center gap-5 rounded-[9px] px-5 text-[19px] font-semibold text-[#111c33]"
        >
          <Settings
            className="h-6 w-6 text-[#111827]"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <span>Settings</span>
        </button>
      </aside>
    </main>
  );
}