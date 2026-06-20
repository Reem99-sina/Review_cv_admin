"use client";

import { useSidebar } from "@/context/sidebarMobile";
import { publicRoutes } from "@/lib/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineReviews } from "react-icons/md";

type SidebarProps = {
  links: { name: string; path: string }[];
};
export default function Sidebar({ links }: SidebarProps) {
  const { open, closeSidebar } = useSidebar();
  const pathname = usePathname();
  
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  if (isPublicRoute) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
         sticky  top-0 left-0 h-full w-64 z-50
          text-text-custom p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          min-h-screen
          bg-secondary
          border-r border-white/10
          shadow-2xl
        `}
      >
        {/* Logo Section */}
        <div className="mb-6 pb-4 border-b border-slate/10">
          <h2 className="text-xl font-bold tracking-wide">
            <MdOutlineReviews />
            <span>Reivew CV</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {links.map((link) => {
            const active = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={closeSidebar}
                className={`
                  relative block px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200

                  ${
                    active
                      ? "bg-text-custom text-white shadow-md shadow-secondary"
                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {/* Active indicator bar */}
                {active && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-background rounded-r" />
                )}

                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer section */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[10px] text-slate-500">
              © {new Date().getFullYear()} Review CV Admin
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
