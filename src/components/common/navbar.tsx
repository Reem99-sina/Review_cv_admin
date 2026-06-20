"use client";
import Image from "next/image";
import { useState } from "react";
import StableButton from "./button";
import Link from "next/link";
import { LinkNav } from "./linkNav";
import { useAuth } from "@/hooks/useAuth";
 export const links = [
    { name: "OverView", path: "/" },

    { name: "Last Activity", path: "/activity" },
    { name: "Users", path: "/users" },
    { name: "Resumes", path: "/resumes" },
    { name: "Reviews", path: "/reviews" },

  ];
  
export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();



  return (
    <header className="fixed md:relative top-0 z-50  inset-0 w-full rounded-2xl ">
      <nav className=" mx-2 px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold ">
          <Image src={"/reviwer.png"} width={60} height={60} alt="reviewer" className='rounded-full'/>
        </div>

        {/* Desktop Links */}
        
          {user ? (
            <div className="hidden md:flex items-center gap-4 text-white">
              <p className="text-sm">Hi, {user.name}</p>

              <StableButton onClick={logout}>Logout</StableButton>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3 text-white">
              <Link href="/login">Login</Link>
              <Link href="/register">
                <StableButton className="bg-secondary">Sign up</StableButton>
              </Link>
            </div>
          )}
     

        <StableButton
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </StableButton>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t border-gray-200 bg-white text-text-custom">
          {links.map((link, key) => (
            <LinkNav key={key} href={link?.path} className="block py-1">
              {link?.name}
            </LinkNav>
          ))}
          {user ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm">Hi, {user.name}</p>

              <StableButton
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Logout
              </StableButton>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <LinkNav href="/login">Login</LinkNav>
              <LinkNav href="/register">Register</LinkNav>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
