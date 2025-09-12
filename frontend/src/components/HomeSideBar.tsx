import Image from "next/image";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  user: { username: string };
  subPage: string;
  setSubPage: (page: string) => void;
}

function Sidebar({ isSidebarOpen, setIsSidebarOpen, user,subPage,setSubPage }: SidebarProps) {
  const handleChangeSubPage=(page:string)=>{
    setSubPage(page);
    setIsSidebarOpen(false);
  }
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex-col w-64 text-gray-300 transition-transform duration-300 ease-in-out transform bg-[url(/bg.png)] ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:flex`}
    >
      <div className="flex items-center justify-between p-6">
        <Image src="/logo.png" alt="logo" width={200} height={100} />
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="block text-gray-400 lg:hidden"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-6">
          <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Principal
          </div>
          <ul className="space-y-2">
            <li>
              <div onClick={()=>{handleChangeSubPage("dashboard")}}
                className={`flex items-center px-4 py-2.5 mx-4 rounded-md hover:bg-gray-400 ${
                  subPage === "dashboard"
                    ? "text-white bg-gray-400"
                    : "text-gray-400 hover:text-white"
                } transition-colors duration-200`}
              >
                Dashboard
              </div>
            </li>
            <li>
              <div onClick={()=>{handleChangeSubPage("list")}}
                className={`flex items-center px-4 py-2.5 mx-4 rounded-md hover:bg-gray-400 ${
                  subPage !== "dashboard"
                    ? "text-white bg-gray-400"
                    : "text-gray-400 hover: hover:text-white"
                } transition-colors duration-200`}
              >
                Liste des hôtels
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center p-6 border-t border-gray-700">
        <Image
          src={
            "https://placehold.co/128x128/77c3ec/ffffff.png?text=" +
            user.username[0]
          }
          className="h-10 w-10 rounded-full mr-4 object-cover"
          alt="Profile"
          width={40}
          height={40}
        />
        <div>
          <div className="text-white font-medium">{user.username}</div>
          <div className="text-sm text-green-500 flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            en ligne
          </div>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
