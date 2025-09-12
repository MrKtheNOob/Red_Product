import React from "react";
import Image from "next/image";
import { on } from "node:stream";

interface DashboardHeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
  user: { username: string };
  subPage: string;
  onChangeSearch?: (value:string)=>void
}
function NotitficationBell() {
  return (
    <a
      href="#"
      className="text-gray-500 hover:text-gray-700 transition-colors duration-200 hidden sm:block"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </a>
  );
}
function SearchBar({onChange}:{onChange?: (value:string)=>void}) {
  return (
    <div className="flex items-center w-full max-w-sm ml-auto">
      <div className="relative w-full">
        <input
          type="text"
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Recherche"
          className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <svg
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
function HamBurgerButton({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (isOpen: boolean) => void;
}) {
  return (
    <button
      onClick={() => setIsSidebarOpen(true)}
      className="text-gray-500 lg:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
function DashboardHeader({
  setIsSidebarOpen,
  handleLogout,
  user,
  subPage,
  onChangeSearch
}: DashboardHeaderProps) {
  return (
    <header className="flex-shrink-0 flex items-center justify-between h-16 bg-white shadow-md p-4 sticky top-0 z-40">
      <HamBurgerButton setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex justify-between items-center ml-4">
        <h2 className="text-2xl font-semibold text-gray-800 hidden md:block">
          {subPage === "dashboard" ? "Dashboard" : "Liste des hôtels"}
        </h2>
        <SearchBar onChange={onChangeSearch}/>
        <div className="flex items-center space-x-4 ml-4">
          <NotitficationBell />
          <div className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <Image
              className="h-8 w-8 rounded-full"
              src={
                "https://placehold.co/128x128/77c3ec/ffffff.png?text=" +
                user.username[0]
              }
              alt="Profile"
              width={32}
              height={32}
            />
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto px-2 py-1 text-sm text-white rounded-m"
          >
            <Image src="/logout.svg" alt="logout" width={20} height={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
