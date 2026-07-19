import { SidebarTrigger } from "#/components/ui/sidebar";
export type HeaderProps = {
  onOpenSidebar: () => void;
  userName: string;
  userImage: string;
};

const Header = ({ userName, userImage }: HeaderProps) => {
  return (
    <header className="h-14 bg-white shadow flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-gray-600 hover:bg-gray-100 p-2 rounded-md transition-colors" />
        <h1 className="font-semibold text-gray-700 hidden sm:block">
          Welcome back!
        </h1>
      </div>
      <div className="flex items-center gap-3 border-l pl-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs sm:text-sm font-semibold text-gray-800">
            {userName}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400">Administrator</p>
        </div>
        {userImage ? (
          <img
            src={userImage}
            alt={userName}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 border border-gray-300 object-cover"
          />
        ) : (
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs sm:text-sm">
            {(userName ? userName.charAt(0) : "U").toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
